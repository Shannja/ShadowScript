from .exponential_expression import ExponentialExpression
from ..node import BinaryNode

class MultiplicativeExpression(BinaryNode):
    @classmethod
    def construct(cls, parser):
        return cls.construct_binary(parser, cls, ExponentialExpression, ["*", "/", "%"])
