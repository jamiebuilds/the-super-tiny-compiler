from itertools import chain
from string import ascii_letters, digits, whitespace

NAME = 'name'
NUMBER = 'number'
PAREN = 'paren'

MULTICHAR_TYPES = [(NUMBER, digits, int),
                   (NAME, ascii_letters, lambda x: x)]


class BacktrackingGenerator():

    def __init__(self, input_):

        def generator():
            """Use send(True-ish) to backtrack."""
            for char in input_:
                if (yield char):
                    # send(True-ish) was called
                    if (yield):
                        raise ValueError('Cannot backtrack twice in a row.')
                    yield char

        self.generator = generator()

    def __iter__(self):
        return self.generator

    def __next__(self):
        return next(self.generator)

    def take_while(self, predicate):
        for char in self.generator:
            if not predicate(char):
                self.generator.send(1)  # backtrack
                break
            yield char


def Token(type_, value):
    return {'type': type_, 'value': value}


def tokenize(input_):
    char_gen = BacktrackingGenerator(input_)

    def tokenize_multiple_chars(char):
        for type_, charset, convert in MULTICHAR_TYPES:
            if char in charset:
                tail = char_gen.take_while(lambda c: c in charset)
                value = convert(''.join(chain([char], tail)))
                return type_, value

    for char in char_gen:
        if char in whitespace:
            continue
        if char in '()':
            yield Token(PAREN, char)
        elif char in digits + ascii_letters:
            yield Token(*tokenize_multiple_chars(char))
        else:
            raise TypeError('I dont know what this character is: ' + char)


def NumberLiteral(value):
    return {'type': 'NumberLiteral', 'value': value}


def CallExpression(name, params):
    return {'type': 'CallExpression', 'name': name, 'params': params}


def parse(tokens):

    def walk(token):
        if token['type'] == NUMBER:
            return NumberLiteral(token['value'])
        if token == Token(PAREN, '('):
            token = next(tokens)
            node = CallExpression(token['value'], [])
            for token in tokens:
                if token == Token(PAREN, ')'):
                    break
                node['params'].append(walk(token))
            return node
        raise TypeError(token['type'])

    ast = {'type': 'Program', 'body': []}
    for token in tokens:
        ast['body'].append(walk(token))
    return ast


class Traverser():

    def __init__(self, visitor):
        self.visitor = visitor

    def traverse(self, ast):
        self.traverse_node(ast)

    def traverse_node(self, node, parent=None):
        method = getattr(self.visitor, node['type'], None)
        if method:
            method(node, parent)
        getattr(self, node['type'])(node)

    def Program(self, node):
        for expression in node['body']:
            self.traverse_node(expression, node)

    def CallExpression(self, node):
        for param in node['params']:
            self.traverse_node(param, node)

    @staticmethod
    def NumberLiteral(node):
        pass


def ExpressionStatement(expression):
    return {'type': 'ExpressionStatement', 'expression': expression}


def Identifier(name):
    return {'type': 'Identifier', 'name': name}


def NewCallExpression(callee, arguments):
    return {'type': 'CallExpression', 'callee': callee, 'arguments': arguments}


class Transformer():

    @classmethod
    def transform(cls, ast):
        new_ast = {'type': 'Program', 'body': []}
        ast['_context'] = new_ast['body']
        Traverser(cls).traverse(ast)
        return new_ast

    @staticmethod
    def NumberLiteral(node, parent):
        parent['_context'].append(NumberLiteral(node['value']))

    @staticmethod
    def CallExpression(node, parent):
        expression = NewCallExpression(Identifier(node['name']), [])
        node['_context'] = expression['arguments']
        if parent['type'] != 'CallExpression':
            expression = ExpressionStatement(expression)
        parent['_context'].append(expression)


class CodeGenerator():

    @classmethod
    def generate_code(cls, node):
        return getattr(cls, node['type'])(node)

    @classmethod
    def Program(cls, node):
        return '\n'.join(map(cls.generate_code, node['body']))

    @classmethod
    def ExpressionStatement(cls, node):
        return cls.generate_code(node['expression']) + ';'

    @classmethod
    def CallExpression(cls, node):
        return '{}({})'.format(
            cls.generate_code(node['callee']),
            ', '.join(map(cls.generate_code, node['arguments'])))

    @staticmethod
    def Identifier(node):
        return node['name']

    @staticmethod
    def NumberLiteral(node):
        return str(node['value'])


def compile_(input_):
    tokens = tokenize(input_)
    ast = parse(tokens)
    new_ast = Transformer.transform(ast)
    return CodeGenerator.generate_code(new_ast)
