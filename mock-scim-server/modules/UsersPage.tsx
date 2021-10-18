import { UserSchema } from "../database/database";
import { HeaderController } from "./HeaderController";
import { NavBar } from "./NavBar";
import { UserItems } from "./UserItems";

export const UsersPage = (data: {users: UserSchema[]}) => {
  const users = data.users;
  return (
    <div>
      <HeaderController embed={{}} title="Users Page" />
      <NavBar></NavBar>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        </div>
      </header>
      <div className="flex flex-col mt-4 mx-auto">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      UserId
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <UserItems users={users}></UserItems>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
