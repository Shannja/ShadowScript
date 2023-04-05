from .multiplicative_expression import MultiplicativeExpression
from ..node import BinaryNode

class AdditiveExpression(BinaryNode):
    @classmethod
    def construct(cls, parser):
        return cls.construct_binary(parser, cls, MultiplicativeExpression, ["+", "-"])
