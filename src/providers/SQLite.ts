import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { INotice } from "../Interfaces/Notice";

export const openDatabase = () => {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
}

export const db = openDatabase();

export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists Notice (id text primary key not null, title text, body text, date text);"
        );
    });
}


export const saveNotice = async (notice: INotice) => {
    const { id, title, body, date } = notice || {};

    db.transaction((tx) => {
        tx.executeSql(
            "insert into Notice (id, title, body, date) values (?, ?, ?, ?);",
            [id, title, body, date]
        );
    });
};


export const getNotices = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "select * from Notice order by date desc;",
                [],
                (_, { rows: { _array } }) => {
                    // console.log("Here _array", _array);
                    resolve(_array);
                },
                (_, error) => {
                    console.log("SQL error: ", error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
