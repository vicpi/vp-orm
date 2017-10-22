// @flow

export type TExpression = any

class Expression {
    left: any
    right: any
    operator: string

    constructor(left: any, operator: string, right: any) {
        this.left = left
        this.right = right
        this.operator = operator
    }

    toString() {
        let left = this.left
        let right = this.stringify(this.right)
        return this.embrace(
            [left, this.operator, right].join(' ')
        )
    }

    embrace(str: string) {
        return `(${str})`
    }

    stringify = (item: any) => {
        if (Array.isArray(item)) {
            return this.embrace(item.map(this.stringify).join(', '))
        } else {
            return String(item)
        }
    }
}

const expr = (left: any, operator: string, right: any) => {
    return new Expression(left, operator, right)
}

const quote = (str: string) => {
    return '"' + str + '"'
}

export {
    Expression,
    expr,
    quote
}
