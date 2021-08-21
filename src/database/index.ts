import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db_moniger_pro');

class DatabaseResponse<T> {
    code: string;
    message: string | null;
    data: T | null;

    constructor(code: string | number | null, message: string | null, data: T | null){
        this.code = code+"" || "0";
        this.message = message;
        this.data = data;
    }
}

function createTables(tables: { name: string, columns: string[] }[]) {
    tables.forEach(table => {
        const {name, columns} = table;
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${name} ( ${columns.join()} );`,
                [],
                undefined,
                (_, err) => {
                    console.log(err.message + " " + 0);
                    return false;
                }
            )
        }, (err) => {
            console.log(err.message + 1);            
        });
    });
}

function insertInitialData(dataset: any[][]) {
    dataset.forEach(element => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR IGNORE INTO ${element[0]} ( ${element[1].join()} ) VALUES ( ${element[2].join()} );`, [],
                undefined,
                (_, error): boolean => {
                    console.warn('{INSERT INITIAL} Error: ' + error.message);
                    return false;
                });
        }, (err) => {
            console.error('{INSERT INITIAL} Error: ' + err.message);       
        });
    });
}

const Database = {
    init: () => {
        createTables([
            {
                name: "movement_types",
                columns: [
                    "id INTEGER PRIMARY KEY AUTOINCREMENT",
                    "name TEXT NOT NULL UNIQUE"
                ]
            },
            {
                name: "movement_categories",
                columns: [
                    "id INTEGER PRIMARY KEY AUTOINCREMENT",
                    "name TEXT NOT NULL UNIQUE",
                    "icon TEXT NOT NULL"
                ]
            },
            {
                name: "movements",
                columns: [
                    "id INTEGER PRIMARY KEY AUTOINCREMENT",
                    "amount INTEGER NOT NULL",
                    "category INTEGER NOT NULL",
                    "type INTEGER NOT NULL",
                    "date TEXT DEFAULT CURRENT_TIMESTAMP",
                    "FOREIGN KEY (category) REFERENCES movement_categories",
                    "FOREIGN KEY (type) REFERENCES movement_types"
                ]
            }
        ]);
        insertInitialData([
            ['movement_types',['name'],["'input'"]],
            ['movement_types',['name'],["'output'"]],
            ['movement_categories',['name','icon'],["'Food'","'fast-food'"]],
            ['movement_categories',['name','icon'],["'Games'","'game-controller'"]],
            ['movement_categories',['name','icon'],["'Gifts', 'gift'"]],
            ['movement_categories',['name','icon'],["'Travels'","'location'"]],
            ['movement_categories',['name','icon'],["'Movies'","'film'"]],
            ['movement_categories',['name','icon'],["'Tools'","'construct'"]],
            ['movement_categories',['name','icon'],["'Art'","'color-palette'"]],
            ['movement_categories',['name','icon'],["'Shopping'","'cart'"]],
            ['movement_categories',['name','icon'],["'Car'","'car'"]],
            ['movement_categories',['name','icon'],["'Business'","'business'"]],
            ['movement_categories',['name','icon'],["'Gym'","'barbell'"]],
            ['movement_categories',['name','icon'],["'Flight'","'airplane'"]],
            ['movement_categories',['name','icon'],["'Card'","'card'"]],
            ['movement_categories',['name','icon'],["'Cash'","'cash'"]],
            ['movement_categories',['name','icon'],["'Yard'","'flower'"]],
            ['movement_categories',['name','icon'],["'Love'","'heart'"]],
            ['movement_categories',['name','icon'],["'Laptop'","'laptop'"]],
            ['movement_categories',['name','icon'],["'Boock'","'library'"]],
            ['movement_categories',['name','icon'],["'Medic'","'medkit'"]],
            ['movement_categories',['name','icon'],["'Pet'","'paw'"]],
            ['movement_categories',['name','icon'],["'Pizza'","'pizza'"]],
            ['movement_categories',['name','icon'],["'Clothes'","'shirt'"]],
            ['movement_categories',['name','icon'],["'Wallet'","'wallet'"]],
            ['movement_categories',['name','icon'],["'Camera'","'ios-camera'"]],
            ['movement_categories',['name','icon'],["'Restaurant'","'ios-restaurant'"]],
            ['movement_categories',['name','icon'],["'Nutrition'","'md-nutrition'"]],
            ['movement_categories',['name','icon'],["'Ideas'","'bulb'"]]
        ]);
    },
    select: async <T>(table: string, columns: string[] = [], condition: string = ""): Promise<DatabaseResponse<T[]>> => {
            return new Promise((resolve, rejected) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT ${columns.length > 0 ? columns.join() : "*"} FROM ${table}${condition ? " WHERE " + condition : ""};`,[],
                    (_, { rows: { _array } }) => resolve(new DatabaseResponse<T[]>(null, null, _array as any as T[])),
                    (_, error): boolean => {
                        console.warn('{SELECT} Error: ' + error.message);
                        rejected(new DatabaseResponse<T[]>(error.code, error.message, null));
                        return false;
                    });
            }, (err) => {
                console.warn('{SELECT} Error: ' + err.message);           
            });
        });
    },
    insert: async <T>(table: string, columns: string[], values: string[]): Promise<DatabaseResponse<T>> => {
        return new Promise((resolve, rejected) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT OR IGNORE INTO ${table} ( ${columns.join()} ) VALUES ( ${values.join()} );`, [],
                    (_, { rows }) => {
                        resolve(new DatabaseResponse<T>(null, null, Array.from(rows as any)[0] as T));
                    },
                    (_, error): boolean => {
                        console.warn('{INSERT} Error: ' + error.message);
                        rejected(new DatabaseResponse<T[]>(error.code, error.message, null));
                        return false;
                    });
            }, (err) => {
                console.warn('{INSERT} Error: ' + err.message);           
            });
        });
    },
    update: async <T>(table: string, updates: string[], id: number | string): Promise<DatabaseResponse<T>> => {
            return new Promise((resolve, rejected) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${table} SET ${updates.join()} WHERE id = ${id};`, [],
                    (_, { rows }) => {
                        resolve(new DatabaseResponse<T>(null, null, Array.from(rows as any)[0] as T));
                    },
                    (_, error): boolean => {
                        console.warn('{UPDATE} Error: ' + error.message);
                        rejected(new DatabaseResponse<T[]>(error.code, error.message, null));
                        return false;
                    });
            }, (err) => {
                console.warn('{UPDATE} Error: ' + err.message);           
            });
        });
    },
    delete: async <T>(table: string, id: number | string): Promise<DatabaseResponse<T>> => {
            return new Promise((resolve, rejected) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM ${table} WHERE id = ${id};`, [],
                    (_, { rows }) => {
                        resolve(new DatabaseResponse<T>(null, null, Array.from(rows as any)[0] as T));
                    },
                    (_, error): boolean => {
                        console.warn('{DELETE} Error: ' + error.message);
                        rejected(new DatabaseResponse<T[]>(error.code, error.message, null));
                        return false;
                    });
            }, (err) => {
                console.warn('{DELETE} Error: ' + err.message);           
            });
        });
    },
}

export default Database;