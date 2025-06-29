import { NavLink } from "react-router";

export default function Property() {
  return (
    <div>
      <h1>Property Page</h1>

      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Go to home
      </NavLink>
    </div>
  );
}
