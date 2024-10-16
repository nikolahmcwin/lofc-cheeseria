import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/cheeses`}>Cheeses</Link>
          </li>
          <li>
            <Link to={`/calculator`}>Calculator</Link>
          </li>
          <li>
            <Link to={`/about`}>About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
