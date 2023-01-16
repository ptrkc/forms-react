import { useApiQuery } from '../../hooks/useApiQuery';
import {
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
interface Form {
  id: number;
  date: string;
  name: string;
  description: string;
}

function TableMessage({ isLoading }: { isLoading: boolean }) {
  return (
    <TableRow>
      <TableCell rowSpan={4} align="center">
        {isLoading ? 'Carregando... ' : 'Nenhum questionário'}
      </TableCell>
    </TableRow>
  );
}

export function FormsPage() {
  const [params, setSearchParams] = useSearchParams();
  const page = params.get('page') ?? '1';
  const skip = page === '1' ? 0 : (Number(page) - 1) * 10;
  const { data = { forms: [], totalCount: 0 }, isLoading } = useApiQuery<{
    forms: Form[];
    totalCount: number;
  }>(`questionarios?skip=${skip}`);

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
              <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && data.totalCount === 0 ? (
              <TableMessage isLoading={isLoading} />
            ) : (
              data.forms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell>{form.id}</TableCell>
                  <TableCell>
                    {new Date(form.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>{form.description}</TableCell>
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
