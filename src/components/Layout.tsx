import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="flex divide-x-2 gap-4 justify-center divide-slate-400">
        <NavLink to="/">
          <li className="list-none px-2 py-1">All Todo's</li>
        </NavLink>
        <NavLink to="completed-todos">
          <li className="list-none px-2 py-1">Completed Todo's</li>
        </NavLink>
        <NavLink to="non-completed-todos">
          <li className="list-none px-2 py-1">Non-completed Todo's</li>
        </NavLink>
      </nav>
      <main className="flex flex-col">
        <Outlet />
      </main>
    </>
  );
}
