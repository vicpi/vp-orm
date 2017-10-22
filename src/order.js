// @flow

class Order {
    column: string|null = null
    sorting: string = 'ASC'

    static asc = 'ASC'
    static desc = 'DESC'

    constructor(column: string, sorting: string) {
        this.column = column
        if (sorting !== undefined) {
            this.sorting = sorting
        }
    }

    toString() {
        if (this.column === null) {
            throw new Error('Order column is null')
        }
        return this.column + ' ' + this.sorting
    }
}

export type TOrder = {
    column: string,
    sorting: string
}

export {
    Order
}
