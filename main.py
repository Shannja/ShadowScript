from lexing.lexing import Lexer
from lexing.source_line import SourceLine
from util.error import LanguageError

def main():
    print('ShadowScript Console\nType quit to exit.')
    lexer = Lexer()

    while True:
        line = input('> ')
        if line == 'quit':
            break
        if line == "": continue

        try:
            line = SourceLine(line)
            tokens = lexer.make_tokens(line)
            print(tokens)
        except LanguageError as error:
            print(error)


if __name__ == '__main__':
    main()
