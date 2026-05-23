import { useAuth }
  from "../../hooks/useAuth";

const DashboardHomePage = () => {

  const { user } = useAuth();

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Welcome back,
        <span className="ml-2">
          {user?.name}
        </span>
      </h1>

      <p className="text-slate-500 mt-3">
        Here's your dashboard overview.
      </p>

    </div>
  );
};

export default DashboardHomePage;