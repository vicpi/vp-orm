import {Criteria} from './criteria'
import {ORM} from './orm'
import {expr, quote} from './expression'
import './polyfill'

class Model {
    constructor(databaseRow : any) {
        const fields = this.getFields()
        fields.forEach(modelField => {
            const databaseField = this.constructor[modelField]
            this[modelField] = databaseRow[databaseField]
        })

        const foreignKeys = this.constructor.getForeignKeys()
        foreignKeys.forEach(foreignKeyName => {
            const foreignKey = this.constructor[foreignKeyName]
            const getListMethodName = `get${foreignKeyName.capitalize()}List`
            this[getListMethodName] = () => {
                const repository = ORM.createRepository(this.constructor)
                const criteria = new Criteria().where(expr(foreignKey.foreignModel[foreignKey.key], '=', quote(this.id)))
                const query = repository.generateQuery(foreignKey.foreignModel, criteria)
                return repository.queryDatabase(query, foreignKey.foreignModel)
            }
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
        const fields = Object.keys(this.constructor).filter(item => !reservedProperties.includes(item)).filter(item => !this.constructor.getForeignKeys().includes(item))
        return fields
    }

    static getForeignKeys() {
        return Object.keys(this).filter(key => typeof this[key] === 'object')
    }
}

export {
    Model
}
