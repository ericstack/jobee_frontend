import { useAuth }
  from "../../hooks/useAuth";

const ProfilePage = () => {

  const { user } = useAuth();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border">

      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Name
          </p>

          <p className="font-medium">
            {user?.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Email
          </p>

          <p className="font-medium">
            {user?.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Role
          </p>

          <p className="font-medium capitalize">
            {user?.role}
          </p>
        </div>

      </div>

    </div>
  );
};

export default ProfilePage;