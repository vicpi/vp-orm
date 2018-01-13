// @flow

export type TList = {
    uuid: string,
    name: string
};
export type TPromise = Promise<any>;

export type TUuid = string;
export type TConnection = any

type TCriteria = any

class Repository {
    connection: TConnection;
    model: any;

    constructor(connection : TConnection, model : any) {
        this.connection = connection
        this.model = model
    }

    generateQuery(criteria : TCriteria = null) {
        const parts = []
        parts.push(`select * from ${this.model.table}`)
        const foreignKeys = this.model.getForeignKeys()
        if (foreignKeys.length > 0) {
            for (let oneForeignKey of foreignKeys) {
                parts.push(`LEFT JOIN ${oneForeignKey.foreignModel.table}
                    on ${this.model.table}.${this.model.id}=${oneForeignKey.foreignModel.table}.${oneForeignKey.foreignKey}`)
            }
        }
        if (criteria !== null) {
            parts.push(criteria)
        }
        return parts.join(' ')
    }

    queryDatabase(query : string) {
        return new Promise((resolve, reject) => {
            console.log('---------------------- SELECT ------------------')
            console.log(query)
            console.log('------------------------------------------------')
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                const models = []
                for (let item of results) {
                    models.push(new this.model(item))
                }
                resolve(models)
            });
        })
    }

    findAll(): TPromise {
        const query = this.generateQuery()
        return this.queryDatabase(query)
    }

    find(criteria : TCriteria): TPromise {
        const query = this.generateQuery(criteria)
        return this.queryDatabase(query)
    }
}

export {
    Repository
}
