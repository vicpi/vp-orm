class Model {
    constructor(databaseRow: any) {
        const fields = this.getFields()
        fields.forEach(modelField => {
            const databaseField = this.constructor[modelField]
            this[modelField] = databaseRow[databaseField]
        })
    }

    toObject() {
        const json = {}
        for (let property in this) {
            json[this.constructor[property]] = this[property]
        }
        return json
    }

    getReservedProperties() {
        return ['table']
    }

    getFields() {
        const reservedProperties = this.getReservedProperties()
        // console.log('keys ', Object.keys(this.constructor), Object.values(this.constructor));
        const fields = Object.keys(this.constructor)
            .filter(item => !reservedProperties.includes(item))
            .filter(item => !this.constructor.getForeignKeys().includes(item))
        return fields
    }

    static getForeignKeys() {
        return Object.keys(this)
            .filter(key => typeof this[key] === 'object')
            .map(key => this[key])
    }
}

export {Model}
