// all the token types, example: OpenParen, Number, BinaryOperator, Number, CloseParen can equal to (5 * 5)
export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Let
}

const KEYWORDS: Record<string, TokenType> = {
    // all the reserved keywords example: store (which is the variable keyword for ShadowScript)
    "store": TokenType.Let
};

export interface Token {
    value: string,
    type: TokenType
}

function token(value = "", type: TokenType): Token {
    return { value, type };
}

function isalpha(src: string) {
    return src.toLowerCase() != src.toUpperCase();
}

function isskipable(str: string) {
    return str == ' ' || str == '\n' || str == '\t'
}

function isint(str: string) {
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)]
    return (c >= bounds[0] && c <= bounds[1]);
}

// tokenize the source code
export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");
    // build each token until end of source code
    while (src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen))
        } else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen))
        } else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/') {
            tokens.push(token(src.shift(), TokenType.BinaryOperator))
        } else if (src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals))
        } else {
            // handle multicharacter operators

            // build a token for numbers
            if (isint(src[0])) {
                let num = "";
                while (src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }
                // push the tokens to the tokens table
                tokens.push(token(num, TokenType.Number))
            } else if (isalpha(src[0])) {
                let ident = "";
                while (src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }
                // check for reserved keywords
                const reserved = KEYWORDS[ident];
                if (reserved == undefined) {
                    // user defined keyword
                    tokens.push(token(ident, TokenType.Identifier))
                } else {
                    // ShadowScript keyword
                    tokens.push(token(ident, reserved))
                }
            } else if (isskipable(src[0])) {
                src.shift(); // skips the charcater if its a tab, newline or white space
            } else {
                console.log("Unrecognised character or keyword at source: ", src[0])
                Deno.exit(1);
            }
        }
    }
    return tokens;
}

const source = await Deno.readTextFile("./test.shadow");
for (const token of tokenize(source)) {
    console.log(token);
}