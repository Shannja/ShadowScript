def main():
    print('ShadowScript Console\nType quit to exit.')

    while True:
        line = input('> ')
        if line == 'quit':
            break
            
        print(line)


if __name__ == '__main__':
    main()
