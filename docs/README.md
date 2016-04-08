<a href="super-tiny-compiler.js"><img width="731" alt="THE SUPER TINY COMPILER" src="https://cloud.githubusercontent.com/assets/952783/14171276/ed7bf716-f6e6-11e5-96df-80a031c2769d.png"/></a>

***Welcome to The Super Tiny Compiler!***

This is an ultra-simplified example of all the major pieces of a modern compiler written in easy to read JavaScript.

We're going to compile some lisp-like function calls into some C-like function calls.
If we had two functions *add* and *subtract* they would be written like this:
``` 
                   LISP                      C
 
    2 + 2          (add 2 2)                 add(2, 2)
    4 - 2          (subtract 4 2)            subtract(4, 2)
    2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
```
Most compilers break down into three primary stages: Parsing, Transformation and Code Generation.

1. *Parsing* is taking raw code and turning it into a more abstract representation of the code.
2. *Transformation* takes this abstract representation and manipulates to do whatever the compiler wants it to.
3. *Code Generation* takes the transformed representation of the code and turns it into new code.

##Parsing

Parsing typically gets broken down into two phases: Lexical Analysis and Syntactic Analysis.
 
1. *Lexical Analysis* takes the raw code and splits it apart into these things called tokens by a thing called a tokenizer (or lexer). Tokens are an array of tiny little objects that describe an isolated piece of the syntax. They could be numbers, labels, punctuation, operators, whatever.
2. *Syntactic Analysis* takes the tokens and reformats them into a representation that describes each part of the syntax and their relation to one another. This is known as an intermediate representation or Abstract Syntax Tree. An Abstract Syntax Tree, or AST for short, is a deeply nested object that represents code in a way that is both easy to work with and tells us a lot of information.
    
For the following syntax:
    
(add 2 (subtract 4 2))
    
Tokens might look something like this:
```
    [
      { type: 'paren',  value: '('        },
      { type: 'name',   value: 'add'      },
      { type: 'number', value: '2'        },
      { type: 'paren',  value: '('        },
      { type: 'name',   value: 'subtract' },
      { type: 'number', value: '4'        },
      { type: 'number', value: '2'        },
      { type: 'paren',  value: ')'        },
      { type: 'paren',  value: ')'        }
    ]
```
    
And an Abstract Syntax Tree (AST) might look like this:
 
```
    {
      type: 'Program',
      body: [{
        type: 'CallExpression',
        name: 'add',
        params: [{
          type: 'NumberLiteral',
          value: '2'
        }, {
          type: 'CallExpression',
          name: 'subtract',
          params: [{
            type: 'NumberLiteral',
            value: '4'
          }, {
            type: 'NumberLiteral',
            value: '2'
          }]
        }]
      }]
    }
```
##Transformation
 
The next type of stage for a compiler is transformation. Again, this just takes the AST from the last step and makes changes to it. It can manipulate the AST in the same language or it can translate it into an entirely new language.
 
Let’s look at how we would transform an AST.
 
You might notice that our AST has elements within it that look very similar. There are these objects with a type property. Each of these are known as an AST Node. These nodes have defined properties on them that describe one isolated part of the tree.
 
We can have a node for a "NumberLiteral":
```
    {
      type: 'NumberLiteral',
      value: '2'
    }
```
Or maybe a node for a "CallExpression":
```
    {
      type: 'CallExpression',
      name: 'subtract',
      params: [...nested nodes go here...]
    }
```
When transforming the AST we can manipulate nodes by adding/removing/replacing properties, we can add new nodes, remove nodes, or we could leave the existing AST alone and create an entirely new one based on it.
Since we’re targeting a new language, we’re going to focus on creating an entirely new AST that is specific to the target language.
```
  ----------------------------------------------------------------------------
    Original AST                     |   Transformed AST
  ----------------------------------------------------------------------------
    {                                |   {
      type: 'Program',               |     type: 'Program',
      body: [{                       |     body: [{
        type: 'CallExpression',      |       type: 'ExpressionStatement',
        name: 'add',                 |       expression: {
        params: [{                   |         type: 'CallExpression',
          type: 'NumberLiteral',     |         callee: {
          value: '2'                 |           type: 'Identifier',
        }, {                         |           name: 'add'
          type: 'CallExpression',    |         },
          name: 'subtract',          |         arguments: [{
          params: [{                 |           type: 'NumberLiteral',
            type: 'NumberLiteral',   |           value: '2'
            value: '4'               |         }, {
          }, {                       |           type: 'CallExpression',
            type: 'NumberLiteral',   |           callee: {
            value: '2'               |             type: 'Identifier',
          }]                         |             name: 'subtract'
        }]                           |           },
      }]                             |           arguments: [{
    }                                |             type: 'NumberLiteral',
                                     |             value: '4'
                                     |           }, {
                                     |             type: 'NumberLiteral',
                                     |             value: '2'
                                     |           }]
                                     |         }]
                                     |       }
                                     |     }]
                                     |   }
```
##Traversal
 
In order to navigate through all of these nodes, we need to be able to traverse through them. This traversal process goes to each node in the AST depth-first.
```
    {
      type: 'Program',
      body: [{
        type: 'CallExpression',
        name: 'add',
        params: [{
          type: 'NumberLiteral',
          value: '2'
        }, {
          type: 'CallExpression',
          name: 'subtract',
          params: [{
            type: 'NumberLiteral',
            value: '4'
          }, {
            type: 'NumberLiteral',
            value: '2'
          }]
        }]
      }]
    }
```
So for the above AST we would go:
 
1. Program - Starting at the top level of the AST
2. CallExpression (add) - Moving to the first element of the Program's body
3. NumberLiteral (2) - Moving to the first element of CallExpression's params
4. CallExpression (subtract) - Moving to the second element of CallExpression's params
5. NumberLiteral (4) - Moving to the first element of CallExpression's params
6. NumberLiteral (2) - Moving to the second element of CallExpression's params
 
If we were manipulating this AST directly, instead of creating a separate AST, we would likely introduce all sorts of abstractions here. But just visiting each node in the tree is enough.
 
The reason I use the word “visiting” is because there is this pattern of how to represent operations on elements of an object structure.
 
*Visitors*
 
The basic idea here is that we are going to create a “visitor” object that has methods that will accept different node types.
```
    var visitor = {
      NumberLiteral() {},
      CallExpression() {}
    };
```
When we traverse our AST we will call the methods on this visitor whenever we encounter a node of a matching type.
In order to make this useful we will also pass the node and a reference to the parent node.

```
    var visitor = {
      NumberLiteral(node, parent) {},
      CallExpression(node, parent) {}
    };
```

##Code Generation
 
The final phase of a compiler is code generation. Sometimes compilers will do things that overlap with transformation, but for the most part code generation just means take our AST and string-ify code back out.
 
Code generators work several different ways, some compilers will reuse the tokens from earlier, others will have created a separate representation of the code so that they can print node linearly, but from what I can tell most will use the same AST we just created, which is what we’re going to focus on.
 
Effectively our code generator will know how to “print” all of the different node types of the AST, and it will recursively call itself to print nested nodes until everything is printed into one long string of code.
  
##Compiler

FINALLY! We'll create our *compiler* function. Here we will link together every part of the pipeline.
 
1. input  => tokenizer   => tokens
2. tokens => parser      => ast
3. ast    => transformer => newAst
4. newAst => generator   => output
