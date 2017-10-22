class Model {
    constructor(item: any) {
        const fields = this.getFields()
        fields.forEach(modelField => {
            const databaseField = this.constructor[modelField]
            this[modelField] = item[databaseField]
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
        const fields = Object.keys(this.constructor)
            .filter(item => !reservedProperties.includes(item))
        return fields
    }
}

export {Model}
