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
    connection: TConnection
    model: any

    constructor(connection: TConnection, model: any) {
        this.connection = connection
        this.model = model
    }

    findAll(): TPromise {
        return new Promise((resolve, reject) => {
            const query = `select * from ${this.model.table}`
            console.log('---------------------- SELECT ------------------')
            console.log(query)
            console.log('------------------------------------------------')
            this.connection.query(`select * from ${this.model.table}`,
                (error, results, fields) => {
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

    find(criteria: TCriteria): TPromise {
        return new Promise((resolve, reject) => {
            const query = `select * from ${this.model.table} ${criteria}`
            console.log('---------------------- SELECT ------------------')
            console.log(query)
            console.log('------------------------------------------------')
            this.connection.query(query,
                (error, results, fields) => {
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
}

export {Repository}
