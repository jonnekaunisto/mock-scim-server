import { Low } from "lowdb/lib";
import { DatabaseSchema, getDataBase, GroupSchema, UserSchema } from "./database";
import {v4 as uuidv4} from 'uuid';

export interface CreateUserOptions {
    externalId: string,
    active: boolean,
    userName: string,
    familyName: string,
    middleName: string,
    givenName: string,
}

export interface CreateGroupOptions {
    displayName: string,
    members: string[],
}

export class DAL {
    private readonly db: Low<DatabaseSchema>;

    constructor(db: Low<DatabaseSchema>) {
        this.db = db;
    }

    public static async create() {
        const db = await getDataBase()
        return new DAL(db);
    }

    public getUser(userId: string): UserSchema | undefined {
        if (this.db.data != null) {
            return this.db.data.users[userId];
        }
        console.log('WARNING: DB IS NOT INITIALIZED')
        throw Error('DB is not initialized');
    }

    public async createUser(user: CreateUserOptions): Promise<UserSchema> {
        if (this.db.data != null) {
            let userId = uuidv4();
            const storedUser: UserSchema = {
                id: userId,
                ...user
            }
            this.db.data.users[userId] = storedUser;
            await this.db.write()
            return storedUser;
        }
        console.log('WARNING: DB IS NOT INITIALIZED')
        throw Error('DB is not initialized');
    }

    public async createGroup(group: CreateGroupOptions): Promise<GroupSchema> {
        if (this.db.data != null) {
            let groupId = uuidv4();
            const storedGroup: GroupSchema = {
                id: groupId,
                ...group
            }
            this.db.data.groups[groupId] = storedGroup;
            await this.db.write()
            return storedGroup;
        }
        console.log('WARNING: DB IS NOT INITIALIZED')
        throw Error('DB is not initialized');
    }
}