using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace TheSuperThinyCompiler.zh
{
    public class TheSuperThinyCompiler
    {
        /**
         * =============================================================================
         *                 将 lisp 风格的函数调用转换为 C 风格
         * =============================================================================
         */
        #region 编译器

        /**
         * ============================================================================
         *                                   (/^▽^)/
         *                                词法分析器（Tokenizer）!
         * ============================================================================
         */
        public List<Token> tokenizer(string input)
        {
            var current = 0;

            var tokens = new List<Token>();

            while (current < input.Length)
            {
                var @char = input[current];

                if (@char == '(')
                {
                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.paren,
                        Value = "("
                    });
                    current++;
                    continue;
                }

                if (@char == ')')
                {
                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.paren,
                        Value = ")"
                    });

                    current++;
                    continue;
                }

                Regex whitespace = new Regex(@"\s");
                if (whitespace.IsMatch(@char.ToString()))
                {
                    current++;
                    continue;
                }

                Regex numbers = new Regex(@"[0-9]");
                if (numbers.IsMatch(@char.ToString()))
                {
                    string value = string.Empty;
                    while (numbers.IsMatch(@char.ToString()))
                    {
                        value += @char;
                        @char = input[++current];
                    }

                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.number,
                        Value = value
                    });

                    continue;
                }

                Regex letters = new Regex(@"[a-z]", RegexOptions.IgnoreCase);
                if (letters.IsMatch(@char.ToString()))
                {
                    string value = string.Empty;

                    while (letters.IsMatch(@char.ToString()))
                    {
                        value += @char;
                        @char = input[++current];
                    }
                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.name,
                        Value = value
                    });
                    continue;
                }

                throw new Exception($"I dont know what this character is: '{@char}'");
            }

            return tokens;
        }

        /**
         * ============================================================================
         *                                 ヽ/❀o ل͜ o\ﾉ
         *                                语法分析器（Parser）!!!
         * ============================================================================
         */
        public LispAstNode parser(List<Token> tokens)
        {
            int current = 0;

            LispAstNode lispAst = new LispAstNode()
            {
                Type = LispAstTypeEnum.Program,
                Body = new List<LispAstNode>()
            };

            while (current < tokens.Count)
            {
                lispAst.Body.Push(walk(tokens, ref current));
            }

            return lispAst;
        }
        protected LispAstNode walk(List<Token> tokens, ref int current)
        {
            var token = tokens[current];

            if (token.Type == TokenTypeEnum.number)
            {
                current++;
                return new LispAstNode()
                {
                    Type = LispAstTypeEnum.NumberLiteral,
                    Value = token.Value
                };
            }

            if (token.Type == TokenTypeEnum.paren && token.Value == "(")
            {
                token = tokens[++current];

                var node = new LispAstNode()
                {
                    Type = LispAstTypeEnum.CallExpression,
                    Name = token.Value,
                    Params = new List<LispAstNode>()
                };

                token = tokens[++current];

                while ((token.Type != TokenTypeEnum.paren) || (token.Type == TokenTypeEnum.paren && token.Value != ")"))
                {
                    node.Params.Push(walk(tokens, ref current));
                    token = tokens[current];
                }

                // 跳过右圆括号
                current++;
                return node;
            }

            throw new Exception($"{token.Type}");
        }

        /**
         * ============================================================================
         *                                 ⌒(❀>◞౪◟<❀)⌒
         *                               遍历器(transformer)!!! 
         * ============================================================================
         */
        public void traverser(LispAstNode lispAst, LispVisitorType lispVisitor)
        {
            traverseNode(lispAst, null, lispVisitor);
        }
        protected void traverseArray(List<LispAstNode> array, LispAstNode parent, LispVisitorType lispVisitor)
        {
            array.ForEach(child => traverseNode(child, parent, lispVisitor));
        }
        protected void traverseNode(LispAstNode node, LispAstNode parent, LispVisitorType lispVisitor)
        {
            Action<LispAstNode, LispAstNode> method = null;
            lispVisitor.TryGetValue(node.Type, out method);
            method?.Invoke(node, parent);

            switch (node.Type)
            {
                case LispAstTypeEnum.Program:
                    traverseArray(node.Body, node, lispVisitor);
                    break;
                case LispAstTypeEnum.CallExpression:
                    traverseArray(node.Params, node, lispVisitor);
                    break;
                case LispAstTypeEnum.NumberLiteral:
                    break;
                default:
                    throw new Exception($"{node.Type}");
            }
        }

        /**
         * ============================================================================
         *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
         *                              转换器（traverser）!!!
         * ============================================================================
         */
        public CAstNode transformer(LispAstNode lispAst)
        {
            var newAst = new CAstNode()
            {
                Type = CAstTypeEnum.Program,
                Body = new List<CAstNode>()
            };

            lispAst.Context = newAst.Body;

            traverser(lispAst, new LispVisitorType()
            {
                // 首先 lispVisitor 方法接受任何 `NumberLiteral`
                [LispAstTypeEnum.NumberLiteral] = (node, parent) =>
                {
                    parent.Context.Push(new CAstNode()
                    {
                        Type = CAstTypeEnum.NumberLiteral,
                        Value = node.Value,
                    });
                },

                // 然后对 `CallExpression`  做相似的事情.
                [LispAstTypeEnum.CallExpression] = (node, parent) =>

                {
                    CAstNode expression = new CAstNode()
                    {
                        Type = CAstTypeEnum.CallExpression,
                        Callee = new CAstNode()
                        {
                            Type = CAstTypeEnum.Identifier,
                            Name = node.Name,
                        },
                        arguments = new List<CAstNode>()
                    };

                    node.Context = expression.arguments;
                    if (parent.Type != LispAstTypeEnum.CallExpression)
                    {
                        expression = new CAstNode()
                        {
                            Type = CAstTypeEnum.ExpressionStatement,
                            Expression = expression
                        };
                    }

                    parent.Context.Push(expression);
                }
            });

            return newAst;
        }

        /**
         * ============================================================================
         *                               ヾ（〃＾∇＾）ﾉ♪
         *                            代码生成器(Code Generator)!!!!
         * ============================================================================
         */
        public string codeGenerator(CAstNode node)
        {
            switch (node.Type)
            {
                case CAstTypeEnum.Program:
                    return node.Body.Map(codeGenerator).Join("\n");
                case CAstTypeEnum.ExpressionStatement:
                    return codeGenerator(node.Expression) + ";";
                case CAstTypeEnum.CallExpression:
                    return codeGenerator(node.Callee) +
                           "(" +
                           node.arguments.Map(codeGenerator).Join(",") +
                           ")";
                case CAstTypeEnum.Identifier:
                    return node.Name;
                case CAstTypeEnum.NumberLiteral:
                    return node.Value;
                default:
                    throw new Exception($"{node.Type}");
            }
        }

        /**
         * ============================================================================
         *                                  (۶* ‘ヮ’)۶”
         *                         !!!!!!!!编译器(compiler)!!!!!!!!
         * ============================================================================
         */
        public string compiler(string input)
        {
            var tokens = tokenizer(input);
            var ast = parser(tokens);
            var newAst = transformer(ast);
            var output = codeGenerator(newAst);

            return output;
        }
        #endregion

        /**
         * =============================================================================
         *                将 C 风格的函数调用转换为 lisp 风格
         * =============================================================================
         */
        #region 反编译器
        /**
         * ============================================================================
         *                                   (/^▽^)/
         *                                词法分析器（Tokenizer）!
         * ============================================================================
         */
        public List<Token> detokenizer(string input)
        {
            var tokens = new List<Token>();
            var current = 0;

            while (current < input.Length)
            {
                var szChar = input[current].ToString();
                
                Regex whitespace = new Regex(@"\s");
                if (whitespace.IsMatch(szChar))
                {
                    current++;
                    continue;
                }

                Regex letter = new Regex(@"[a-z]", RegexOptions.IgnoreCase);
                if (letter.IsMatch(szChar))
                {
                    string value = string.Empty;
                    while (letter.IsMatch(szChar))
                    {
                        value += szChar;
                        szChar = input[++current].ToString();
                    }

                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.name,
                        Value = value
                    });
                    continue;
                }

                if (szChar == ")")
                {
                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.paren,
                        Value = szChar,
                    });

                    current++;
                    continue;
                }

                Regex number = new Regex(@"[0-9]");
                if (number.IsMatch(szChar))
                {
                    string value = string.Empty;
                    while (number.IsMatch(szChar))
                    {
                        value += szChar;
                        szChar = input[++current].ToString();
                    }

                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.number,
                        Value = value
                    });

                    continue;
                }

                if (szChar == ",")
                {
                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.paren,
                        Value = szChar,
                    });
                    current++;
                    continue;
                }

                if (szChar == "(")
                {
                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.paren,
                        Value = szChar,
                    });
                    current++;
                    continue;
                }

                if (szChar == ";")
                {
                    tokens.Push(new Token()
                    {
                        Type = TokenTypeEnum.paren,
                        Value = szChar,
                    });
                    current++;
                    continue;
                }

                throw new Exception($"I dont know what this character is: {szChar}");
            }

            return tokens;
        }

        /**
         * ============================================================================
         *                                 ヽ/❀o ل͜ o\ﾉ
         *                                语法分析器（Parser）!!!
         * ============================================================================
         */
        public CAstNode deparser(List<Token> tokens)
        {
            CAstNode nast = new CAstNode()
            {
                Type = CAstTypeEnum.Program,
                Body = new List<CAstNode>()
            };

            var current = 0;

            while (current < tokens.Count)
            {
                nast.Body.Push(dewalk(tokens, ref current));
            }

            return nast;
			
        }
        protected CAstNode dewalk(List<Token> tokens, ref int current)
        {
            var token = tokens[current];

            // 数字类型直接返回
            if (token.Type == TokenTypeEnum.number)
            {
                current++;
                return new CAstNode()
                {
                    Type = CAstTypeEnum.NumberLiteral,
                    Value = token.Value
                };
            }

            // 函数名也直接返回
            if (token.Type == TokenTypeEnum.name)
            {
                var expression = new CAstNode()
                {
                    Type = CAstTypeEnum.CallExpression,
                    Callee = new CAstNode()
                    {
                        Type = CAstTypeEnum.Identifier,
                        Name = token.Value,
                    },
                    arguments = new List<CAstNode>()
                };

                List<CAstNode> arguments = new List<CAstNode>();

                // 跳过左括号
                ++current;   // 这个位置是左括号，要跳过
                token = tokens[++current];

                while ((token.Type != TokenTypeEnum.paren) || (token.Type == TokenTypeEnum.paren && token.Value != ")"))
                {
                    if ((token.Type == TokenTypeEnum.paren) && (token.Value == "," || token.Value == ";"))
                    {
                        token = tokens[++current];
                        continue;
                    }

                    expression.arguments.Push(dewalk(tokens, ref current));
                    token = tokens[current];
                }

                // 跳过右圆括号
                current++;

                // 跳过分号
                token = tokens[current];
                if (token.Type == TokenTypeEnum.paren && token.Value == ";") current++;

                return expression;
            }


            throw new Exception($"{token.Type}");
        }

        /**
         * ============================================================================
         *                                 ⌒(❀>◞౪◟<❀)⌒
         *                               遍历器(transformer)!!!
         * ============================================================================
         */
        public void detraverser(CAstNode ast, CVisitorType visitor)
        {
            detraverseNode(ast, null, visitor);
        }

        protected void detraverseArray(List<CAstNode> array, CAstNode parent, CVisitorType visitor)
        {
            array.ForEach(child => detraverseNode(child, parent, visitor));
        }

        protected void detraverseNode(CAstNode node, CAstNode parent, CVisitorType visitor)
        {
            Action<CAstNode, CAstNode> method = null;
            visitor.TryGetValue(node.Type, out method);
            method?.Invoke(node, parent);

            switch (node.Type)
            {
                case CAstTypeEnum.Program:
                    detraverseArray(node.Body, node, visitor);
                    break;
                case CAstTypeEnum.ExpressionStatement:
                    detraverseNode(node.Expression, node, visitor);
                    break;
                case CAstTypeEnum.CallExpression:
                    detraverseNode(node.Callee, node, visitor);
                    detraverseArray(node.arguments, node, visitor);
                    break;
                case CAstTypeEnum.Identifier:
                    break;
                case CAstTypeEnum.NumberLiteral:
                    break;
            }
        }

        /**
         * ============================================================================
         *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
         *                             转换器（traverser）!!!
         * ============================================================================
         */
        public LispAstNode detransformer(CAstNode ast)
        {
            var newAst = new LispAstNode()
            {
                Type = LispAstTypeEnum.Program,
                Body = new List<LispAstNode>()
            };

            ast.Context = newAst.Body;

            detraverser(ast, new CVisitorType()
            {
                [CAstTypeEnum.NumberLiteral] = (node, parent) =>
                {
                    parent.Context.Push(new LispAstNode()
                    {
                        Type = LispAstTypeEnum.NumberLiteral,
                        Value = node.Value,
                    });
                },

                [CAstTypeEnum.CallExpression] = (node, parent) =>
                {
                    LispAstNode @params = new LispAstNode()
                    {
                        Type = LispAstTypeEnum.CallExpression,
                        Name = node.Callee.Name,
                        Params = new List<LispAstNode>(),
                    };

                    node.Context = @params.Params;
                    parent.Context.Push(@params);
                },
            });

            return newAst;
        }

        /**
         * ============================================================================
         *                               ヾ（〃＾∇＾）ﾉ♪
         *                            代码生成器(Code Generator)!!!!
         * ============================================================================
         */
        public string decodeGenerator(LispAstNode node)
        {
            switch (node.Type)
            {
                case LispAstTypeEnum.Program:
                    return node.Body.Map(decodeGenerator).Join("\n");
                case LispAstTypeEnum.NumberLiteral:
                    return node.Value;
                case LispAstTypeEnum.CallExpression:
                    return "(" + node.Name + " " + node.Params.Map(decodeGenerator).Join(" ") + ")";
                default:
                    throw new Exception($"{node.Type}");
            }
        }

        /**
         * ============================================================================
         *                                  (۶* ‘ヮ’)۶”
         *                         !!!!!!!!反编译器(decompiler)!!!!!!!!
         * ============================================================================
         */

        public string decompiler(string input)
        {
            var tokens = detokenizer(input);
            var ast = deparser(tokens);
            var newAst = detransformer(ast);
            var output = decodeGenerator(newAst);
            return output;
        }
        #endregion
    }

    #region 模型和扩展方法

    public static class TypeFunctionWrapperExtenses
    {
        public static void Push<T>(this List<T> source, T value) => source.Add(value);
        public static string Join(this string[] strs, string s) => string.Join(s, strs);
        public static V[] Map<T, V>(this List<T> source, Func<T, V> codeGenerator) =>
            source == null || source.Count == 0 ? new V[0] : source.Select(codeGenerator).ToArray();
    }

    #region Token Model

    public class Token
    {
        public TokenTypeEnum Type { get; set; }
        public string Value { get; set; }
    }

    public enum TokenTypeEnum
    {
        paren,
        name,
        number,
    }
    #endregion

    #region Lisp Style AST Model
    public class LispAstNode
    {
        public LispAstTypeEnum Type { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public List<LispAstNode> Params { get; set; } = new List<LispAstNode>();
        public List<LispAstNode> Body { get; set; } = new List<LispAstNode>();

        public List<CAstNode> Context { get; set; } = new List<CAstNode>();
    }

    public enum LispAstTypeEnum
    {
        Program,
        CallExpression,
        NumberLiteral
    }
    #endregion

    #region C Style AST Model

    public class CAstNode
    {
        public CAstTypeEnum Type { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public CAstNode Expression { get; set; }
        public CAstNode Callee { get; set; }


        public List<CAstNode> arguments { get; set; } = new List<CAstNode>();
        public List<CAstNode> Body { get; set; } = new List<CAstNode>();

        public List<LispAstNode> Context { get; set; } = new List<LispAstNode>();
    }

    public enum CAstTypeEnum
    {
        Program,
        ExpressionStatement,
        CallExpression,
        Identifier,
        NumberLiteral,
    }

    #endregion

    #region VisitorWrap
    
    // 我不喜欢一遍一遍写长类型名……

    public class LispVisitorType : Dictionary<LispAstTypeEnum, Action<LispAstNode, LispAstNode>>
    {
        // Lisp 风格 AST 的遍历器

    }

    public class CVisitorType : Dictionary<CAstTypeEnum, Action<CAstNode, CAstNode>>
    {
        // C 风格 AST 的遍历器
    }

    #endregion

    #endregion

}
