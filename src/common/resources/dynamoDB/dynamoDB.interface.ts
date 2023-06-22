export interface Item {
    id: string;
    [key: string]: any;
}

export interface QueryItem {
    tableName: string;
    index: string;
    queryKey: string;
    queryValue: string;
}

export interface UpdateItem {
    tableName: string;
    primaryKey: string;
    primaryKeyValue: string;
    updates: {
        [key: string]: any;
    };
}