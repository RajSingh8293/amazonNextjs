import { getAllUsers } from "@/lib/actions/user.actions";

export default async function UserManagementPage() {
  const data = await getAllUsers();
  //   console.log("users :", data);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
