// @flow

class Limit {
    limit: number
    offset: number

    setLimit(limit: number) {
        this.limit = limit
    }

    setOffset(offset: number) {
        this.offset = offset
    }

    toString() {
        let string = ''
        if (this.limit === undefined && this.offset !== undefined) {
            throw new Error("Limit: You can't set offset without limit")
        }
        if (this.limit !== undefined) {
            string += `LIMIT ${this.limit} `
        }
        if (this.offset !== undefined) {
            string += `OFFSET ${this.offset}`
        }
        return string
    }
}

export {
    Limit
}
