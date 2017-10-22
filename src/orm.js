import mysql from 'mysql'
import {Repository} from './repository'
import {Model} from './model'
import {DataMapper} from './data-mapper'

export type TDatabaseConfiguration = {
    host: string,
    user: string,
    password: string,
    database: string,
}

export type TConnection = {
    query: (string, any, any) => void
}

class ORM {
    static connection = null
    static dataMapper = null

    static configure(databaseConfiguration: TDatabaseConfiguration) {
        this.connection = mysql.createConnection({
            host: databaseConfiguration.host,
            user: databaseConfiguration.user,
            password: databaseConfiguration.password,
            database: databaseConfiguration.database
        })
        this.connection.connect()
    }

    static getConnection() {
        return this.connection
    }

    static createRepository(model: Model) {
        return new Repository(this.getConnection(), model)
    }

    static createDataMapper() {
        if (this.dataMapper === null) {
            this.dataMapper = new DataMapper(this.getConnection())
        }
        return this.dataMapper
    }
}

export {
    ORM
}
