import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to={`/`}>Home</NavLink>
          </li>
          <li>
            <NavLink to={`/cheeses`}>Cheeses</NavLink>
          </li>
          <li>
            <NavLink to={`/calculator`}>Calculator</NavLink>
          </li>
          <li>
            <NavLink to={`/about`}>About</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
