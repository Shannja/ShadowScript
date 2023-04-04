class Token:
    def __init__(self, kind, line):
        self.kind = kind
        self.line = line
        self.string = ""
