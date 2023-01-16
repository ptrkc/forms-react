import { useApiQuery } from '../../hooks/useApiQuery';
import {
  Button,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useUser } from '../../hooks/useUser';
interface Form {
  id: number;
  role: string;
  name: string;
  cpf: string;
}

function TableMessage({ isLoading }: { isLoading: boolean }) {
  return (
    <TableRow>
      <TableCell colSpan={4} align="center" sx={{ fontSize: 18, p: 4 }}>
        {isLoading ? 'Carregando... ' : 'Nenhum questionário'}
      </TableCell>
    </TableRow>
  );
}

export function UsersPage() {
  const { user } = useUser();
  const [params, setSearchParams] = useSearchParams();
  const page = params.get('page') ?? '1';
  const skip = page === '1' ? 0 : (Number(page) - 1) * 10;
  const { data = { users: [], totalCount: 0 }, isLoading } = useApiQuery<{
    users: Form[];
    totalCount: number;
  }>(`usuarios?skip=${skip}`, { token: user?.token });

  const amountOfPages = Math.ceil(data.totalCount / 10);

  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <Stack justifyContent="center" alignItems="center" spacing={4}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && data.totalCount === 0 ? (
              <TableMessage isLoading={isLoading} />
            ) : (
              data.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.cpf}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={amountOfPages}
        page={parseInt(page)}
        onChange={handlePageChange}
      />
    </Stack>
  );
}
