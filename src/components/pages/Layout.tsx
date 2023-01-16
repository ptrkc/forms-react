import { Box, Button, Container, Link, Stack } from '@mui/material';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export function Layout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const logOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav>
        <Stack
          padding={2}
          fontSize={18}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          maxWidth={'md'}
          marginX="auto"
        >
          <Stack direction="row" spacing={4}>
            <Link component={RouterLink} to="/questionarios">
              Questionários
            </Link>
            <Link component={RouterLink} to="/questionario/novo">
              Novo Questionário
            </Link>
            {user?.role === 'admin' && (
              <Link component={RouterLink} to="/usuarios">
                Usuários
              </Link>
            )}
          </Stack>
          <Box>
            {user ? (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <span>
                  Olá, {user.name}
                  {user.role === 'admin' && ' (admin)'}
                </span>
                <Button
                  fontSize={18}
                  component={Link}
                  onClick={logOut}
                  variant="outlined"
                >
                  Sair
                </Button>
              </Stack>
            ) : (
              <Link component={RouterLink} to="/">
                Entrar
              </Link>
            )}
          </Box>
        </Stack>
      </nav>
      <Container
        sx={{
          padding: 4,
          maxWidth: 'md',
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
