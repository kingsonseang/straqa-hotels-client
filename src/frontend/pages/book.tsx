import { NavLink } from "react-router";

export default function Book() {
  return (
    <div>
      <h1>Booking Page</h1>

      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Go to home
      </NavLink>
    </div>
  );
}
