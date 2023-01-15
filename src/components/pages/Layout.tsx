import { Button, Link } from '@mui/material';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser';

export function Layout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const logOut = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link component={RouterLink} to="/">
              Questionário
            </Link>
          </li>
          <li>
            <Link component={RouterLink} to="/questionarios/novo">
              Novo Questionário
            </Link>
          </li>
          {user ? (
            <li>
              <Link component={Button} onClick={logOut}>
                Sair
              </Link>
            </li>
          ) : (
            <li>
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
