'use strict';

/**
 * TTTTTTTTTTTTTTTTTTTTTTTHHHHHHHHH     HHHHHHHHHEEEEEEEEEEEEEEEEEEEEEE
 * T:::::::::::::::::::::TH:::::::H     H:::::::HE::::::::::::::::::::E
 * T:::::::::::::::::::::TH:::::::H     H:::::::HE::::::::::::::::::::E
 * T:::::TT:::::::TT:::::THH::::::H     H::::::HHEE::::::EEEEEEEEE::::E
 * TTTTTT  T:::::T  TTTTTT  H:::::H     H:::::H    E:::::E       EEEEEE
 *         T:::::T          H:::::H     H:::::H    E:::::E
 *         T:::::T          H::::::HHHHH::::::H    E::::::EEEEEEEEEE
 *         T:::::T          H:::::::::::::::::H    E:::::::::::::::E
 *         T:::::T          H:::::::::::::::::H    E:::::::::::::::E
 *         T:::::T          H::::::HHHHH::::::H    E::::::EEEEEEEEEE
 *         T:::::T          H:::::H     H:::::H    E:::::E
 *         T:::::T          H:::::H     H:::::H    E:::::E       EEEEEE
 *       TT:::::::TT      HH::::::H     H::::::HHEE::::::EEEEEEEE:::::E
 *       T:::::::::T      H:::::::H     H:::::::HE::::::::::::::::::::E
 *       T:::::::::T      H:::::::H     H:::::::HE::::::::::::::::::::E
 *       TTTTTTTTTTT      HHHHHHHHH     HHHHHHHHHEEEEEEEEEEEEEEEEEEEEEE
 *
 *    SSSSSSSSSSSSSSS UUUUUUUU     UUUUUUUUPPPPPPPPPPPPPPPPP   EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 *  SS:::::::::::::::SU::::::U     U::::::UP::::::::::::::::P  E::::::::::::::::::::ER::::::::::::::::R
 * S:::::SSSSSS::::::SU::::::U     U::::::UP::::::PPPPPP:::::P E::::::::::::::::::::ER::::::RRRRRR:::::R
 * S:::::S     SSSSSSSUU:::::U     U:::::UUPP:::::P     P:::::PEE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 * S:::::S             U:::::U     U:::::U   P::::P     P:::::P  E:::::E       EEEEEE  R::::R     R:::::R
 * S:::::S             U:::::U     U:::::U   P::::P     P:::::P  E:::::E               R::::R     R:::::R
 *  S::::SSSS          U:::::U     U:::::U   P::::PPPPPP:::::P   E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 *   SS::::::SSSSS     U:::::U     U:::::U   P:::::::::::::PP    E:::::::::::::::E     R:::::::::::::RR
 *     SSS::::::::SS   U:::::U     U:::::U   P::::PPPPPPPPP      E:::::::::::::::E     R::::RRRRRR:::::R
 *        SSSSSS::::S  U:::::U     U:::::U   P::::P              E::::::EEEEEEEEEE     R::::R     R:::::R
 *             S:::::S U:::::U     U:::::U   P::::P              E:::::E               R::::R     R:::::R
 *             S:::::S U::::::U   U::::::U   P::::P              E:::::E       EEEEEE  R::::R     R:::::R
 * SSSSSSS     S:::::S U:::::::UUU:::::::U PP::::::PP          EE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 * S::::::SSSSSS:::::S  UU:::::::::::::UU  P::::::::P          E::::::::::::::::::::ER::::::R     R:::::R
 * S:::::::::::::::SS     UU:::::::::UU    P::::::::P          E::::::::::::::::::::ER::::::R     R:::::R
 *  SSSSSSSSSSSSSSS         UUUUUUUUU      PPPPPPPPPP          EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
 * TTTTTTTTTTTTTTTTTTTTTTTIIIIIIIIIINNNNNNNN        NNNNNNNNYYYYYYY       YYYYYYY
 * T:::::::::::::::::::::TI::::::::IN:::::::N       N::::::NY:::::Y       Y:::::Y
 * T:::::::::::::::::::::TI::::::::IN::::::::N      N::::::NY:::::Y       Y:::::Y
 * T:::::TT:::::::TT:::::TII::::::IIN:::::::::N     N::::::NY::::::Y     Y::::::Y
 * TTTTTT  T:::::T  TTTTTT  I::::I  N::::::::::N    N::::::NYYY:::::Y   Y:::::YYY
 *         T:::::T          I::::I  N:::::::::::N   N::::::N   Y:::::Y Y:::::Y
 *         T:::::T          I::::I  N:::::::N::::N  N::::::N    Y:::::Y:::::Y
 *         T:::::T          I::::I  N::::::N N::::N N::::::N     Y:::::::::Y
 *         T:::::T          I::::I  N::::::N  N::::N:::::::N      Y:::::::Y
 *         T:::::T          I::::I  N::::::N   N:::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N    N::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N     N:::::::::N       Y:::::Y
 *       TT:::::::TT      II::::::IIN::::::N      N::::::::N       Y:::::Y
 *       T:::::::::T      I::::::::IN::::::N       N:::::::N    YYYY:::::YYYY
 *       T:::::::::T      I::::::::IN::::::N        N::::::N    Y:::::::::::Y
 *       TTTTTTTTTTT      IIIIIIIIIINNNNNNNN         NNNNNNN    YYYYYYYYYYYYY
 *
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPPPPPPPPP   IIIIIIIIIILLLLLLLLLLL             EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 *      CCC::::::::::::C   OO:::::::::OO   M:::::::M             M:::::::MP::::::::::::::::P  I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::::::::::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::::M           M::::::::MP::::::PPPPPP:::::P I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::RRRRRR:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM:::::::::M         M:::::::::MPP:::::P     P:::::PII::::::IILL:::::::LL             EE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::::::M       M::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E       EEEEEE  R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::::::M     M:::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::M::::M   M::::M:::::::M  P::::PPPPPP:::::P   I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M M::::M M::::M M::::::M  P:::::::::::::PP    I::::I    L:::::L                 E:::::::::::::::E     R:::::::::::::RR
 * C:::::C              O:::::O     O:::::OM::::::M  M::::M::::M  M::::::M  P::::PPPPPPPPP      I::::I    L:::::L                 E:::::::::::::::E     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M   M:::::::M   M::::::M  P::::P              I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM::::::M    M:::::M    M::::::M  P::::P              I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::M     MMMMM     M::::::M  P::::P              I::::I    L:::::L         LLLLLL  E:::::E       EEEEEE  R::::R     R:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM::::::M               M::::::MPP::::::PP          II::::::IILL:::::::LLLLLLLLL:::::LEE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *      CCC::::::::::::C   OO:::::::::OO   M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPP          IIIIIIIIIILLLLLLLLLLLLLLLLLLLLLLLLEEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 */

/**
 * 오늘 우리는 함께 컴파일러를 작성할 것입니다. 하지만 여러분이 알고있는 컴파일러가 아니라... 매우
 * 기능이 간소하고 작은 컴파일러입니다! 너무 작아서 주석을 모두 제거하면 이 파일의 실제 코드는 200줄 밖에
 * 되지 않습니다.
 *
 * 우리는 어떤 lisp과 같은 함수 호출을 C와 같은 함수호출로 컴파일 할 것입니다.
 *
 * 만약 여러분이 위 언어에 익숙하지 않을 수 있습니다. 그래서 간단하게 소개하도록 하겠습니다.
 *
 * 만약 `add`와 `subtract`라는 두 함수가 있다면 다음과 같이 작성될 것입니다:
 *
 *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 *
 * 참 쉽죠?
 *
 * 좋습니다. 이것들이 바로 오늘 우리가 컴파일 할 것들입니다. 위 함수들은 완전한 LISP이나 C 구문은
 * 아니지만, 현대 컴파일러의 주요한 부분을 많이 증명하기엔 충분합니다.
 */

/**
 * 대부분의 컴파일러들은 세가지 중요한 단계를 가지고 있습니다: Parsing, Transformation,
 * 그리고 Code Generation 입니다.
 *
 * 1. *Parsing*은 원시 코드를 추상적인 코드로 바꿔주는 단계입니다.
 *
 * 2. *Transformation*은 이 추상적인 코드를 가지고, 컴파일러가 원하는 것은 무엇이든지 할 수
 *    있도록 변형합니다.
 *
 * 3. *Code Generation*은 변형된 추상젹인 코드를 새로운 코드로 바꿉니다.
 */

/**
 * Parsing
 * -------
 *
 * 구문 분석은 일반적으로 두 단게로 분류됩니다: Lexical Analysis and Syntactic Analysis.
 *
 * 1. *Lexical Analysis*는 원시 코드를 가져다가 tokenizer(또는 lexer)라고 불리는 것에 의헤
 *    토큰이라고 불리는 것으로 분리됩니다.
 *
 *    토큰은 구문의 분리된 부분을 설명하는 작은 물체들의 배열입니다. 숫자, 라벨, 구두점, 조작자,
 *    무엇이든 될 수 있습니다.
 *
 * 2. *Syntactic Analysis*는 토큰을 구문의 각 부분과 그 관계를 설명하는 표현으로 재구성합니다.
 *    이것은 중간 표현 또는 추상 구문 트리로 알려져 있습니다.
 *
 *    추상 구문 트리, 즉 줄여서 AST는 코드를 다루기 쉽고 우리에게 많은 정보를 알려주는 방식으로
 *    표현된 중첩된 객체 입니다.
 *
 * 다음 구문은:
 *
 *   (add 2 (subtract 4 2))
 *
 * 토큰을 이용하면 다음과 같이 보일지도 모릅니다:
 *
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
 *
 * 그리고 추상 구문 트리 (AST)는 아마 아래와 같이 보일겁니다:
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2',
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4',
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2',
 *         }]
 *       }]
 *     }]
 *   }
 */

/**
 * Transformation
 * --------------
 *
 * 컴파일러의 다음 스테이지 유형은 변환입니다. 다시 말하지만, 이건 그냥 마지막 단계에서 AST를 가지고
 * 변경하는것 뿐입니다. 같은 언어로 AST를 조작하거나 완전히 새로운 언어로 바꿀 수도 있습니다.
 *
 * AST를 어떻게 변화시킬지 살펴보도록 할까요.
 *
 * 여러분은 AST의 구성 요소들이 매우 비슷하게 생겼다는 것을 눈치챘을 겁니다.
 * 이 오브젝트들은 타입 속성을 가지고 있습니다. 이것들 각각은 AST 노드라고 알려져 있습니다. 이 노드들은
 * 트리의 분리된 한 부분을 설명하는 속성들을 가지고 있습니다.
 *
 * 우리는 "NumberLiteral"를 위한 노드를 가질 수 있습니다:
 *
 *   {
 *     type: 'NumberLiteral',
 *     value: '2',
 *   }
 *
 * 또는 "CallExpression"노드도 있을 수 있습니다:
 *
 *   {
 *     type: 'CallExpression',
 *     name: 'subtract',
 *     params: [...nested nodes go here...],
 *   }
 *
 * AST를 변환할 때 우리는 속성을 추가/제거/교체하여 노드를 조작할 수 있고, 새로운 노드를 추가하거나,
 * 노드를 제거하거나, 기존 AST를 그대로 두고 그것에 기반한 완전히 새로운 노드를 만들 수 있습니다.
 *
 * 우리는 새로운 언어를 목표로 하고 있기 때문에, 완전히 새로운 AST를 만드는 데 초점을 맞출 것입니다.
 *
 * Traversal
 * ---------
 *
 * 모든 노드를 탐색하기 위해서는 우리는 노드들을 순회할 필요성이 있습니다. 이 순회 과정은 AST의 각각의
 * 노드들을 깊이를 우선하여 탐색합니다.
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2'
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4'
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2'
 *         }]
 *       }]
 *     }]
 *   }
 *
 * 위 AST를 위해 우리는:
 *
 *   1. Program - AST의 최상위 레벨에서 시작
 *   2. CallExpression (add) - Program의 body에서 첫번째 요소로 이동
 *   3. NumberLiteral (2) - CallExpression의 첫 번째 요소로 이동
 *   4. CallExpression (subtract) - CallExpression의 두 번째 요소로 이동
 *   5. NumberLiteral (4) - CallExpression의 첫 번째 요소로 이동
 *   6. NumberLiteral (2) - CallExpression의 두 번째 요소로 이동
 *
 * 만약 우리가 이 AST를 직접 조작한다면, 별도의 AST를 만드는 대신에 다양한 종류의 추상화를 도입할 겁니다.
 * 하지만 트리안에 있는 각각의 노드들을 방문하는 것만으로도 우리가 하려는 일을 할 수 있습니다.
 *
 * "방문"이라는 단어를 사용하는 이유는, 객체 구조의 요소에 대한 작업을 어떻게 표현해야 하는지에 대해
 * 패턴이 있기 때문입니다.
 *
 * Visitors
 * --------
 *
 * 기본적인 아이디어는 다른 노드 타입을 가지고 있는 방문자 객체를 만드는 것입니다.
 *
 *   var visitor = {
 *     NumberLiteral() {},
 *     CallExpression() {},
 *   };
 *
 * 우리가 AST를 순회할 때, 매칭되는 타입의 노드에 방문했을 경우, 해당하는 메서드를 visitor에서 호출
 * 할 것입니다.
 *
 * 이것을 유용하게 만들기 위해 우리는 노드와 상위 노드에 대한 참조를 전달할 것입니다.
 *
 *   var visitor = {
 *     NumberLiteral(node, parent) {},
 *     CallExpression(node, parent) {},
 *   };
 *
 * 그러나, 우리는 "exit"를 호출할 가능성에 대해서도 고려해야합니다. 리스트로 부터 우리의 트리 구조에 대해
 * 상상해 볼까요:
 *
 *   - Program
 *     - CallExpression
 *       - NumberLiteral
 *       - CallExpression
 *         - NumberLiteral
 *         - NumberLiteral
 *
 * 계속 순회를 하다보면, 언젠가는 마지막 가지에 닿을 것입니다. 각 가지의 끝에 도달했을 때, 우리는 해당 트리에서
 * "exit" 합니다. 그래서 각각의 트리를 내려가는것을 "enter", 다시 위로 올라가는 것을 "exit"라 합니다.
 *
 *   -> Program (enter)
 *     -> CallExpression (enter)
 *       -> Number Literal (enter)
 *       <- Number Literal (exit)
 *       -> Call Expression (enter)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *       <- CallExpression (exit)
 *     <- CallExpression (exit)
 *   <- Program (exit)
 *
 * 이를 위해 visitor의 최종 형태는 다음과 같습니다:
 *
 *   var visitor = {
 *     NumberLiteral: {
 *       enter(node, parent) {},
 *       exit(node, parent) {},
 *     }
 *   };
 */

/**
 * Code Generation
 * ---------------
 *
 * 컴파일러의 마지막 단계는 코드 생성입니다. 때때로 컴파일러는 변환과 겹치는 일을 하곤 하지만, 대부분의
 * 부분 코드 생성은 우리의 AST와 문자열 식별 코드를 다시 빼내는 것을 의미합니다.
 *
 * 코드 제너레이터는 여러가지 다른 방식으로 작동하며, 어떤 컴파일러는 이전과 다른 토큰을 재사용할 것이고,
 * 다른 컴파일러는 노드를 선형적으로 출력할 수 있도록 코드의 별도 표현을 만들 것입니다. 그러나 여기서
 * 말할 수 있는 것은 우리가 방금 만든 것과 동일한 AST를 사용하게 될 것이며, 이것이 우리가 집중해야 할
 * 부분 입니다.
 *
 * 효과적으로 우리의 코드 제너레이터는 AST의 모든 다양한 노드 유형을 "출력"하는 방법을 알게 될 것이며,
 * 모든 것이 하나의 긴 코드 문자열로 인쇄될 때까지 중첩된 노드를 인쇄하기 위해 스스로를 재귀적으로 호출할
 * 것입니다.
 */

/**
 * 이게 다입니다! 이것들을 조합하면 컴파일러가 됩니다.
 *
 * 그렇다고 해서 모든 컴파일러들이 내가 여기서 말한 것과 똑같이 생겼다는 뜻은 아닙니다. 컴파일러는 여러 가지 
 * 목적을 가지고 있으며, 여기서 상세히 설명한 것보다 더 많은 단계가 필요할지도 모릅니다.
 *
 * 그러나 이제 여러분들은 대부분의 컴파일러가 어떻게 생겼는지 대해 일반사람들보다 높은 수준의 생각을 
 * 가져야 합니다.
 *
 * 이제 모든것을 설명했으니까, 여러분들은 여러분들만의 컴파일러를 작성할 수 있습니다. 그렇죠?
 *
 * 농담입니다, 그것이 바로 이글을 작성한 이유니까요 :P
 *
 * 그러면 시작해 볼까요...
 */

/**
 * ============================================================================
 *                                   (/^▽^)/
 *                                THE TOKENIZER!
 * ============================================================================
 */

/**
 * 우리는 첫번재 단계로 parsing, lexical analysis를 tokenizer를 이용하여 시작할 겁니다.
 * 
 * 우리는 앞에서 보았던 코드를 가지고 토큰의 배열로 분해할 것입니다.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */

// 코드 문자열을 받는것으로 부터 시작합니다.
// 그리고 두가지 것들을 설정합니다.
function tokenizer(input) {

  // `current` 변수는 위치를 추적합니다. 마치 커서처럼요.
  let current = 0;


  // `tokens` 배열은 토큰들이 들어가는 배열입니다.
  let tokens = [];

  // `current` 변수를 내부에서 원하는 만큼 증가시키도록 설정하는 "while" 반목문을 만드는 것으로 
  // 시작합니다.
  //
  // 토큰의 길이가 어느 정도 될 수 있으므로 하나의 반복문 안에서 여러 번 `current`를 증가시키고자 
  // 할 수도 있기 때문입니다.
  while (current < input.length) {

    // 현재 문자를 char에 저장합니다.
    let char = input[current];

    // 우리가 가장 먼저 확인하고 싶은 것은 개방된 괄호 입니다. 나중에 `CallExpression`에
    // 쓰이겠지만 현재로스는 문자에만 신경을 쓰도록 하겠습니다.
    //
    // 개방된 괄호가 있는지 체크합니다:
    if (char === '(') {

      // 만약 if을 통과한다면 개방된 괄호는 `paren` type과 값을 새 토큰으로 정의합니다.
      tokens.push({
        type: 'paren',
        value: '(',
      });

      // `current를 증가시킵니다`
      current++;

      // `continue`를 통해 새로운 반복문을 시작합니다.
      continue;
    }

    // 다음으로 우리는 닫힌 괄호를 확인합니다. 우리는 이전과 같은 방법을 사용합니다: 닫힌 괄호를 확인하면
    // 새로운 토큰을 추가하고 `current`를 증가시키고, `continue`를 실행합니다.
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    // 이제 공백에 대해 확인해 볼 겁니다. 우리는 공백을 문자 분리를 위해 사용하지만, 실제로 토큰으로
    // 저장하는 것은 중요하지 않습니다. 여기서는 공백은 거릅니다.
    //
    // 따라서 여기서는 단지 공백인지 체크한 후, `continue`를 호출합니다.
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 다음은 숫자 토큰 타입입니다. 이것은 앞에서 보았던 것과는 다릅니다. 왜냐하면 숫자는 어떤 숫자의
    // 문자가 될 수 있기 때문이고 우리는 모든 숫자들을 하나의 숫자로 저장하기를 원합니다.
    //
    //   (add 123 456)
    //        ^^^ ^^^
    //        오직 2개의 토큰으로 분리되기를 원합니다.
    //
    // 따라서 우리는 숫자의 가장 첫부분을 만났을 때부터 시작합니다.
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {

      // `value`변수는 문자들을 저장합니다.
      let value = '';

      // 이제 문자가 숫자가 아닐때까지 계속해서 `value`에 더하며 `current`값을 증가시킵니다.
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // 그 후, 완성된 `number` 토큰을 `tokens`배열에 넣습니다.
      tokens.push({ type: 'number', value });

      // 계속 진행합니다.
      continue;
    }

    // 우리는 또한 큰따옴표(")로 둘러쌓여진 텍스트 문자열도 지원해야합니다.
    //
    //   (concat "foo" "bar")
    //            ^^^   ^^^ 문자열 토큰들
    //
    // 따옴표로 시작하는지 체크합니다:
    if (char === '"') {
      // 문자열 토큰을 저장할 `value`변수를 만듭니다.
      let value = '';

      // 큰 따옴표는 무시합니다.
      char = input[++current];

      // 큰 따옴표가 나오기 전까지 문자들을 저장합니다.
      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      // 닫는 큰따옴표는 무시합니다.
      char = input[++current];

      // 완성된 `string` 토큰을 `tokens` 배열에 추가합니다.
      tokens.push({ type: 'string', value });

      continue;
    }

    // 마지막 토큰 타입은 `name` 입니다. 
    // 이것은 숫자 대신 글자의 순서, 즉 우리의 lisp 구문에 있는 함수의 이름입니다.
    //
    //   (add 2 4)
    //    ^^^
    //    Name token
    //
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      // 계속 반복하면서 value에 문자들을 저장합니다.
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // 그리고 value를 `name` 타입으로 저장한 후 계속 진행합니다.
      tokens.push({ type: 'name', value });

      continue;
    }

    // 마지막으로, 매칭되지않는 문자들이 있다면, error를 던지고 완전히 종료합니다.
    throw new TypeError('I dont know what this character is: ' + char);
  }

  // 그리고 `tokenizer`는 간단하게 tokens 배열을 반환하고 종료합니다.
  return tokens;
}

/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                                THE PARSER!!!
 * ============================================================================
 */

/**
 * 우리들의 parser는, 토큰 배열을 가져다가 AST로 바꿉니다.
 *
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 */

 // 자 이제 `tokens` 배열을 인자로 받는 `parser`를 정의합시다.
function parser(tokens) {

  // `current` 변수는 위치를 저장하는 커서로 사용됩니다.
  let current = 0;

  // 그러나 여기서는 `while` 반복문 대신 재귀를 사용합니다. 그래서 우리는 `walk` 함수를 정의할
  // 겁니다.
  function walk() {

    // walk 함수 안에서 `current` 토큰을 가져와서 시작합니다.
    let token = tokens[current];

    // 우리는 `number` 토큰을 시작으로 각 토큰을 다른 코드 경로로 나눌 것입니다.
    //
    // `number` 토큰인지 확인합니다.
    if (token.type === 'number') {

      // 만약 우리가 그 코튼을 가지고 있다면 `current`를 증가시킵니다.
      current++;

      // 그리고 우리는 토큰 값과 `NumberLiteral`로 불리는 타입을 가진 새로운 AST노드를 반환
      // 합니다.
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    // 만약 우리가 문자열을 가지고 있다면 `StringLiteral` 노드를 만듭니다.
    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    // 다음으로 우리는 CallExpressions을 찾을 겁니다. 이 작업은 열린 괄호를 만났을 때 실행 됩니다.
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {

      // AST에서 괄호를 생략하도록 `current`를 증가시킵니다.
      token = tokens[++current];

      // `CallExpression` 타입의 기본 노드를 만듭니다. 그리고 열린 괄호 뒤에 있는 토큰이
      // 함수의 이름이기 때문에 현재 토큰의 값으로 설정합니다.
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      // 이제 이름 토큰을 건너뛰기 위해서 `current`를 증가시킵니다. 
      token = tokens[++current];

      // 그리고 이제 우리는 닫힌 괄호를 만날 때까지 각각의 코튼들이 `CallExpression`의 `params`이
      // 되도록 순회하고자 한다.\
      //
      // 이제 재귀안으로 들어가 보자. 무한히 중첩될 수 있는 노드 집합을 분석하려고 시도하는 대신, 
      // 문제를 해결하기 위해 재귀 작업에 의존할 겁니다.
      //
      // 이것에 대해 설명하기 위해서, Lisp 코드를 가져와보자. 여러분들은 addd 내부에 포함된
      // 숫자들과 `CallExpression`을 볼 수 있을 것입니다.
      //
      //   (add 2 (subtract 4 2))
      //
      // 여러분들은 또한 여러개의 닫힌 괄호를 가지고 있다는 것도 눈치 챘을 것입니다.
      //
      //   [
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'add'      },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'subtract' },
      //     { type: 'number', value: '4'        },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: ')'        }, <<< 닫힌 괄호
      //     { type: 'paren',  value: ')'        }, <<< 닫힌 괄호
      //   ]
      //
      //
      // 우리는 중첩된 `walk` 함수에 의존하여 중첩된 CallExpression을 넘어 `current` 변수를
      // 증가시킬 것입니다.

      // 따라서 우리는 `paren` 타입과 닫힌 괄호의 `value`를 가진 토큰을 만날 때까지 반복되는
      // `while` 반복문을 만들 것입니다.
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {

        // `walk` 함수를 호출한 후 반횐되는 `node`를 `node.params`에 넣습니다.
        node.params.push(walk());
        token = tokens[current];
      }

      // 마지막으로 우리는 `current`를 증가시켜 닫힌 괄호를 생략합니다.
      current++;

      // 그리고 node를 반환합니다.
      return node;
    }

    // 다시 말씀드리지만, 토큰의 종류를 인식하지 못했을 경우, error를 던집니다.
    throw new TypeError(token.type);
  }

  // 이제, 우리들은 `Program`을 노드로 갖는 새로운 AST를 만들었습니다.
  let ast = {
    type: 'Program',
    body: [],
  };

  // 그리고 우리는 `walk`함수를 이용하여 `ast.body` 함수를 빠르게 채워나갈 수 있습니다. 
  //
  // 반복문 안에서 하는 이유는 우리 프로그램이 중첩이 아닌 `CallExpression`를 연달아 가질
  // 수 있기 때문입니다.
  //
  //   (add 2 2)
  //   (subtract 4 2)
  //
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  // 마지막으로 ast를 반환합니다.
  return ast;
}

/**
 * ============================================================================
 *                                 ⌒(❀>◞౪◟<❀)⌒
 *                               THE TRAVERSER!!!
 * ============================================================================
 */

/**
 * 우리는 이제 AST를 가지고 visitor와 함께 다른 노드를 방문하려고 합니다. 우리는 일치하는 유형의
 * 노드를 만날 때마다 visitor에 대해 메서드를 호출할 수 있어야 합니다.
 *
 *   traverse(ast, {
 *     Program: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     CallExpression: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     NumberLiteral: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *   });
 */

 // 따라서 우리는 AST를 순회하는 함수를 정의합니다. 이 함수 안에 두 함수를
 // 정의할 것입니다.
function traverser(ast, visitor) {

  // `traverseArray` 함수는 배열로 반복할 수 있는 함수이며, 다음에 정의될 함수를 
  // 호출합니다: `traverseNode`.
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  // `traverseNode`는 `node`와 그것의 `perent`노드를 받습니다. 따라서 visitor 매서드들을 모두
  // 넘길 수 있습니다.
  function traverseNode(node, parent) {

    // 우리는 먼저 visitor에 대한 메서드의 존재 여부를 'type'을 테스트하는것으로 시작합니다.
    let methods = visitor[node.type];

    // 이 노드 타입에 대한 `enter` 메서드가 있다면 `node`와 `parent`와 함께 호출할 것입니다.
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // 다음으로 현재 노드들을 유형별로 구분합니다.
    switch (node.type) {

      // 우리는 최상위 경로인 `Program`에서 시작합니다. Program 노드들은 노드들의 배열을 가지고
      // 있는 body라는 속성을 가지고 있기 때문에, 우리는 `traverseArray`를 호출하여 그들을
      // 순회할 것입니다.
      //
      // (`traverseArray`는 `traverseNode`를 호출하므로, 따라서 우리는 트리를 재귀적으로 돌고 
      // 있다는 것을 기억해야합니다)
      case 'Program':
        traverseArray(node.body, node);
        break;

      // 다음으로 `CallExpression`는 `params`과 함께 똑같은 작업을 합니다.
      case 'CallExpression':
        traverseArray(node.params, node);
        break;
      // `NumberLiteral`과 `StringLiteral`의 경우 방문해야할 자식 노드가 없으므로 넘어
      // 갑니다.
      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      // 노드 타입을 인식할수 없다면, error를 던집니다.
      default:
        throw new TypeError(node.type);
    }

    // 만약 'exit' 메서드가 존재한다면, `node`와 `parent`와 함께 호출합니다.
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // 마지막으로 traverser 함수는 `parent`가 없는 ast와 함쎄 `traverseNode`를 호출합니다.
  // 왜냐하면 최상위 AST는 부모를 가지고 있지 않기 때문입니다.
  traverseNode(ast, null);
}

/**
 * ============================================================================
 *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
 *                              THE TRANSFORMER!!!
 * ============================================================================
 */

/**
 * 다음으로, transformer입니다. transformer는 AST를 가지고 visitor와 함께 새로운 ast를 
 * 만들 것입니다. 
 *
 * ----------------------------------------------------------------------------
 *   Original AST                     |   Transformed AST
 * ----------------------------------------------------------------------------
 *   {                                |   {
 *     type: 'Program',               |     type: 'Program',
 *     body: [{                       |     body: [{
 *       type: 'CallExpression',      |       type: 'ExpressionStatement',
 *       name: 'add',                 |       expression: {
 *       params: [{                   |         type: 'CallExpression',
 *         type: 'NumberLiteral',     |         callee: {
 *         value: '2'                 |           type: 'Identifier',
 *       }, {                         |           name: 'add'
 *         type: 'CallExpression',    |         },
 *         name: 'subtract',          |         arguments: [{
 *         params: [{                 |           type: 'NumberLiteral',
 *           type: 'NumberLiteral',   |           value: '2'
 *           value: '4'               |         }, {
 *         }, {                       |           type: 'CallExpression',
 *           type: 'NumberLiteral',   |           callee: {
 *           value: '2'               |             type: 'Identifier',
 *         }]                         |             name: 'subtract'
 *       }]                           |           },
 *     }]                             |           arguments: [{
 *   }                                |             type: 'NumberLiteral',
 *                                    |             value: '4'
 * ---------------------------------- |           }, {
 *                                    |             type: 'NumberLiteral',
 *                                    |             value: '2'
 *                                    |           }]
 *  (죄송하지만 너무 길어서 생략합니다. )      |         }
 *                                    |       }
 *                                    |     }]
 *                                    |   }
 * ----------------------------------------------------------------------------
 */

// 따라서 transformer 함수는 lisp ast를 받습니다. 
function transformer(ast) {

  // 이전 AST와 마찬가지로 Program 노드를 갖는 newAst를 만들 것입니다.
  let newAst = {
    type: 'Program',
    body: [],
  };

  // Next I'm going to cheat a little and create a bit of a hack. We're going to
  // use a property named `context` on our parent nodes that we're going to push
  // nodes to their parent's `context`. Normally you would have a better
  // abstraction than this, but for our purposes this keeps things simple.
  //
  // Just take note that the context is a reference *from* the old ast *to* the
  // new ast.
  ast._context = newAst.body;

  // 우리는 ast 그리고 visitor와 함께 traverser 함수를 호출하면서 시작합니다.
  traverser(ast, {

    // 첫번째 visitor 메서드는 `NumberLiteral` 입니다.
    NumberLiteral: {
      // 방문할때 메서드를 정의합니다.
      enter(node, parent) {
        // `NumberLiteral` 이름의 새 노드를 만든 후 부모의 context에 추가합니다.
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    // 다음으로 `StringLiteral` 입니다.
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    // 다음은 `CallExpression`.
    CallExpression: {
      enter(node, parent) {

        // We start creating a new node `CallExpression` with a nested
        // `Identifier`.
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        // Next we're going to define a new context on the original
        // `CallExpression` node that will reference the `expression`'s arguments
        // so that we can push arguments.
        node._context = expression.arguments;

        // Then we're going to check if the parent node is a `CallExpression`.
        // If it is not...
        if (parent.type !== 'CallExpression') {

          // We're going to wrap our `CallExpression` node with an
          // `ExpressionStatement`. We do this because the top level
          // `CallExpression` in JavaScript are actually statements.
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }

        // Last, we push our (possibly wrapped) `CallExpression` to the `parent`'s
        // `context`.
        parent._context.push(expression);
      },
    }
  });

  // transformer 함수가 새로운 newAst를 반환함으로써 완성됩니다.
  return newAst;
}

/**
 * ============================================================================
 *                               ヾ（〃＾∇＾）ﾉ♪
 *                            THE CODE GENERATOR!!!!
 * ============================================================================
 */

/**
 * 이제 마지막 단계로 넘어갑시다: 코드 제너레이터.
 *
 * 코드제너레이터는 재귀적으로 호출하여 트리의 각 노드들을 하나의 거대한 문자열로 출력할 것입니다.
 */

function codeGenerator(node) {

  // `node`의 타입에 따라 진행합니다.
  switch (node.type) {

    // `Program` 노드일 경우입니다. `body`의 각 노드를 맵으로 돌면서 코드 제너레이터를 거치면서
    // 새로운 줄로 합칩니다.
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    // `ExpressionStatement`의 경우, 중첩된 코드 제네레이터를 호출합니다. 그리고 세미콜론을
    // 추가합니다...
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) +
        ';' // << (...우리는 *올바른* 방식으로 코드화 하려하기 때문입니다)
      );

    // `CallExpression`의 경우, `callee`를 출력한 후 괄호를 열고, `arguments`를 맵으로
    // 돌면서 코드 제네레이터를 통과시킨 후, 콤마와 함께 join한후 괄호를 닫습니다.
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );

    // `Identifier`의 경우 `node`의 이름을 반환합니다.
    case 'Identifier':
      return node.name;

    // `NumberLiteral`의 경우, `node`의 값을 반환합니다.
    case 'NumberLiteral':
      return node.value;

    // `StringLiteral`의 경우, 큰 따옴표로 둘러쌓인 `node`의 값을 반환합니다.
    case 'StringLiteral':
      return '"' + node.value + '"';

    // 그리고 노드로 인식하지 못한 결우에, error를 던집니다.
    default:
      throw new TypeError(node.type);
  }
}

/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!THE COMPILER!!!!!!!!
 * ============================================================================
 */

/**
 * 마침내! 우리는 '컴파일러' 함수를 만들 것입니다. 여기에 우리가 만든 모든 것들을 파이프라인으로
 * 연결합니다.
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

  // 그리고 output을 리턴합니다
  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!여러분이 만든거에요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

// 이제 모든것을 exports 합니다...
module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler,
};
