// the node types
export type NodeType = 
    | "Program" 
    | "NumericLiteral"  
    | "Identifier" 
    | "BinaryExpr"
    // | "CallExpr" 
    // | "UnaryExpr" 
    // | "FunctionDecleration";

// we need this so the other interfaces can be a NodeType
export interface Stmt {
    kind: NodeType;
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}

// deno-lint-ignore no-empty-interface
export interface Expr extends Stmt {}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    symbol: string;
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}