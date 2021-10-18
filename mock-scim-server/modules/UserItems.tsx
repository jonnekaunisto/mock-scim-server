import { UserSchema } from "../database/database";

interface UserItemProps {
  readonly users: UserSchema[];
}

export const UserItems: React.FC<UserItemProps> = (props) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {props.users.map((user) => (
        <tr key={user.userName}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {(user.userName)}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.userName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              View
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
