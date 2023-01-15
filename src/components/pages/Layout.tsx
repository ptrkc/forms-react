import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Questionário</Link>
          </li>
          <li>
            <Link to="/questionarios/novo">Novo Questionário</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/login">Sair</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
