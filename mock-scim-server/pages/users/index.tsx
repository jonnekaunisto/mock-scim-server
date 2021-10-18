import { getDataBase, UserSchema } from "../../database/database";
import { UsersPage } from "../../modules/UsersPage";

export default UsersPage


export async function getServerSideProps() {
    const db = await getDataBase();

    if (db.data == null) {
        throw Error("DB not initalized");
    }
    const users: UserSchema[] = [];
    Object.keys(db.data.users).forEach((key) => {
        users.push(db.data!.users[key]);
    });
    return { props: { users: users } };
}