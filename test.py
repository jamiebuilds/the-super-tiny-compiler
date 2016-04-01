# py.test test.py -v

import pytest

from super_tiny_compiler_unannotated import (
    NAME, NUMBER, PAREN,
    BacktrackingGenerator,
    CallExpression, ExpressionStatement, Identifier, NewCallExpression,
    NumberLiteral, Token,
    CodeGenerator, Transformer,
    compile_, parse, tokenize)

TEST_CASES = [
    {
        'input': '(add 2 (subtract 4 2))',
        'output': 'add(2, subtract(4, 2));',
        'tokens': [Token(PAREN, '('),
                   Token(NAME, 'add'),
                   Token(NUMBER, 2),
                   Token(PAREN, '('),
                   Token(NAME, 'subtract'),
                   Token(NUMBER, 4),
                   Token(NUMBER, 2),
                   Token(PAREN, ')'),
                   Token(PAREN, ')')],
        'ast': {'type': 'Program',
                'body': [CallExpression('add',
                                        [NumberLiteral(2),
                                         CallExpression('subtract',
                                                        [NumberLiteral(4),
                                                         NumberLiteral(2)])])]
                },
        'new_ast': {
            'type': 'Program',
            'body': [
                ExpressionStatement(
                    NewCallExpression(
                        Identifier('add'),
                        [NumberLiteral(2),
                         NewCallExpression(
                            Identifier('subtract'),
                            [NumberLiteral(4),
                             NumberLiteral(2)])
                         ])
                    )
                ]}}
]


def test_BacktrackingGenerator():
    g = BacktrackingGenerator('abcde')
    assert next(g) == 'a'
    assert ''.join(g.take_while(lambda c: c != 'e')) == 'bcd'
    assert next(g) == 'e'


@pytest.mark.parametrize("input_, expected",
                         [(c['input'], c['tokens']) for c in TEST_CASES])
def test_tokenize(input_, expected):
    assert list(tokenize(input_)) == expected


@pytest.mark.parametrize("tokens, expected",
                         [(c['tokens'], c['ast']) for c in TEST_CASES])
def test_parse(tokens, expected):
    assert parse(iter(tokens)) == expected


@pytest.mark.parametrize("ast, expected",
                         [(c['ast'], c['new_ast']) for c in TEST_CASES])
def test_transform(ast, expected):
    assert Transformer.transform(ast) == expected


@pytest.mark.parametrize("new_ast, expected",
                         [(c['new_ast'], c['output']) for c in TEST_CASES])
def test_generate_code(new_ast, expected):
    assert CodeGenerator.generate_code(new_ast) == expected


@pytest.mark.parametrize("input_, expected",
                         [(c['input'], c['output']) for c in TEST_CASES])
def test_compile(input_, expected):
    assert compile_(input_) == expected
