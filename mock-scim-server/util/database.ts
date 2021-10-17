import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

export interface DatabaseSchema {
    users: {[userId: string]: UserSchema},
    groups: {[groupId: string]: GroupSchema},
}

export interface UserSchema {
    id: string,
    externalId: string,
    active: boolean,
    userName: string,
    familyName: string,
    middleName: string,
    givenName: string,
}

export interface GroupSchema {
    
}

export async function getDataBase(): Promise<Low<DatabaseSchema>> {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile<DatabaseSchema>(file)
    const db = new Low(adapter)
    
    await db.read()
    // If DB is not initalized populate it
    if (db.data == null) {
        db.data ||= { users: {}, groups: {} }
    }
    return db;
}
