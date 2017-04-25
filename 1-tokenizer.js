/**
 * ============================================================================
 *                                   (/^▽^)/
 *                                THE TOKENIZER!
 * ============================================================================
 */

/**
 * We're gonna start off with our first phase of parsing, lexical analysis, with
 * the tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */

/**
 * First, let’s create a class to remember the position of each token.
 */
class Position {
  constructor(index, line = 1, column = 1) {
    this.line = line;
    this.column = column;
    this.index = index;
  }
  nextCh() {
    this.column++;
    this.index++;
    return this;
  }
  nextLine() {
    this.column = 1;
    this.line++;
    return this;
  }
  clone() {
    return new Position(
      this.index,
      this.line,
      this.column
    );
  }
  toString() {
    return this.line + ':' + this.column;
  }
}

// We start by accepting an input string of code, and we're gonna set up two
// things...
function tokenizer(input) {
  // A `current` variable for tracking our position in the code like a cursor.
  let current = new Position(0);

  // And a `tokens` array for pushing our tokens to.
  let tokens = [];

  // We start by creating a `while` loop where we are setting up our `current`
  // variable to be incremented as much as we want `inside` the loop.
  //
  // We do this because we may want to increment `current` many times within a
  // single loop because our tokens can be any length.
  while (current.index < input.length) {
    // We're also going to store the `current` character in the `input`.
    let char = input[current.index];

    // The first thing we want to check for is an open parenthesis. This will
    // later be used for `CallExpression` but for now we only care about the
    // character.
    //
    // We check to see if we have an open parenthesis:
    if (char === '(') {

      // If we do, we push a new token with the type `paren` and set the value
      // to an open parenthesis. We also store the `start` and `end` of this
      // token for future reference.
      tokens.push({
        type: 'paren',
        value: '(',
        start: current.clone(),
        end: current.clone(),
      });
      // Then we increment `current`.
      current.nextCh();

      // And we `continue` onto the next cycle of the loop.
      continue;
    }

    // Next we're going to check for a closing parenthesis. We do the same exact
    // thing as before: Check for a closing parenthesis, add a new token,
    // increment `current`, and `continue`.
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
        start: current.clone(),
        end: current.clone().nextCh(),
      });
      current.nextCh();
      continue;
    }

    // Moving on, we're now going to check for whitespace. This is interesting
    // because we care that whitespace exists to separate characters, but it
    // isn't actually important for us to store as a token. We would only throw
    // it out later.
    //
    // So here we're just going to test for existence and if it does exist we're
    // going to just `continue` on.
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current.nextCh();
      // If the character is a newline, we'll tell the cursor that we've
      // moved to the next line.
      if (char === '\n') {
        current.nextLine();
      }
      continue;
    }

    // The next type of token is a number. This is different than what we have
    // seen before because a number could be any number of characters and we
    // want to capture the entire sequence of characters as one token.
    //
    //   (add 123 456)
    //        ^^^ ^^^
    //        Only two separate tokens
    //
    // So we start this off when we encounter the first number in a sequence.
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {

      // We're going to create a `value` string that we are going to push
      // characters to.
      let value = '';
      // We'll also save the start of the number for later.
      const start = current.clone();

      // Then we're going to loop through each character in the sequence until
      // we encounter a character that is not a number, pushing each character
      // that is a number to our `value` and incrementing `current` as we go.
      while (NUMBERS.test(char)) {
        value += char;
        current.nextCh();
        if (current.index >= input.length) {
          break;
        }
        char = input[current.index];
      }

      // After that we push our `number` token to the `tokens` array.
      tokens.push({ type: 'number', value, start, end: current.clone() });

      // And we continue on.
      continue;
    }

    // We'll also add support for strings in our language which will be any
    // text surrounded by double quotes (").
    //
    //   (concat "foo" "bar")
    //            ^^^   ^^^ string tokens
    //
    // We'll start by checking for the opening quote:
    if (char === '"') {
      // Keep a `value` variable for building up our string token.
      let value = '';
      // We'll also save the start of the string for later.
      const start = current.clone();
      // If the quote is the last character in the program,
      // throw a syntax error:
      if (current.index + 1 >= input.length) {
        throw new SyntaxError(`Unterminated string at ${start}-${current}`);
      }
      // Otherwise, skip past the quote...
      current.nextCh();


      // ...and grab the first character of the string.
      char = input[current.index];

      // Then we'll iterate through each character until we reach another
      // double quote.
      while (char !== '"') {
        value += char;
        // If the string is not terminated before the end of the program,
        // throw a syntax error
        if (current.index + 1 >= input.length) {
          throw new SyntaxError(`Unterminated string at ${start}-${current}`);
        }
        // Otherwise, increment the cursor
        current.nextCh();
        // And grab the next character.
        char = input[current.index];
      }

      // Skip the closing double quote.
      current.nextCh();
      char = input[current.index];

      // And add our `string` token to the `tokens` array.
      tokens.push({ type: 'string', value, start, end: current.clone() });

      continue;
    }

    // The last type of token will be a `name` token. This is a sequence of
    // letters instead of numbers, that are the names of functions in our lisp
    // syntax.
    //
    //   (add 2 4)
    //    ^^^
    //    Name token
    //
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      // First, we'll create a string to hold the value
      let value = '';
      // And save the current position for later.
      const start = current.clone();

      // Again we're just going to loop through all the letters pushing them to
      // a value.
      while (LETTERS.test(char) && current.index < input.length) {
        value += char;
        current.nextCh();
        char = input[current.index];
      }

      // And pushing that value as a token with the type `name` and continuing.
      tokens.push({ type: 'name', value, start, end: current.clone() });

      continue;
    }

    // Finally if we have not matched a character by now, we're going to throw
    // a syntax error and completely exit.
    throw new SyntaxError('I dont know what this character is: ' + char);
  }

  // Then at the end of our `tokenizer` we simply return the tokens array.
  return tokens;
}

// Just exporting our tokenizer to be used in the final compiler...
module.exports = tokenizer;