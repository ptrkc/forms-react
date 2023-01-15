import { Outlet, Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

export function Layout() {
  const user = useUser();

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
          {user ? (
            <li>
              <Link to="/login">Sair</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
