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

    generateQuery(model, criteria : TCriteria = null, foreignKey = null) {
        const parts = []
        const selectFields = foreignKey === null
            ? '*'
            : `${foreignKey.foreignModel.table}.*`
        parts.push(`select ${selectFields} from ${model.table}`)
        // if (foreignKey !== null) {
            // parts.push(`LEFT JOIN ${foreignKey.foreignModel.table}
                    // on ${model.table}.${model.id}=${foreignKey.foreignModel.table}.${foreignKey.foreignKey}`)
        // }
        if (criteria !== null) {
            parts.push(criteria)
        }
        return parts.join(' ')
    }

    queryDatabase(query : string, model: any) {
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
                    models.push(new model(item))
                }
                resolve(models)
            });
        })
    }

    async findAll(): TPromise {
        const query = this.generateQuery(this.model)
        const models = await this.queryDatabase(query, this.model)
        // const foreignKeys = this.model.getForeignKeys()
        // if (foreignKeys.length > 0) {
        //     const foreignKey = foreignKeys[0]
        //     const foreignQuery = this.generateQuery(this.model, null, foreignKey)
        //     const foreignModels = await this.queryDatabase(foreignQuery, foreignKey.foreignModel)
        //     foreignModels.forEach(foreignModel => {
        //         // console.log('foreignKey ', foreignModel, foreignModel[foreignKey.foreignModelKey]);
        //         const correspondingModel = models.find(
        //             model => model.id === foreignModel[foreignKey.foreignModelKey]
        //         )
        //         // console.log('correspondingModel ', correspondingModel);
        //         if (correspondingModel.books === undefined) {
        //             correspondingModel.books = []
        //         }
        //         correspondingModel.books.push(foreignModel)
        //     })
        //     // console.log(models);
        //     // console.log(foreignModels);
        // }
        return models
    }

    find(criteria : TCriteria): TPromise {
        const query = this.generateQuery(this.model, criteria)
        return this.queryDatabase(query, this.model)
    }
}

export {
    Repository
}
