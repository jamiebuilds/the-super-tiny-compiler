var tokenizer     = require('./1-tokenizer');
var parser        = require('./2-parser');
// Note: The traverser is only used inside of the transformer...
var transformer   = require('./4-transformer');
var codeGenerator = require('./5-code-generator');

/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!THE COMPILER!!!!!!!!
 * ============================================================================
 */

/**
 * FINALLY! We'll create our `compiler` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */

function compiler(input) {
  let tokens = tokenizer(input);
  let ast    = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  // and simply return the output!
  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!YOU MADE IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

/**
 * Now, if you enjoyed this, please give it a star on GitHub and follow me on
 * Twitter (the links are up on the top right).
 *
 * You can also play around with this code/website on glitch.com (link is also
 * on top right).
 */

// Just exporting our compiler to be used in the tests
module.exports = compiler;
