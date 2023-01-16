import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export function FormActions({
  formId,
  authorId,
}: {
  formId: number;
  authorId: number;
}) {
  const { user } = useUser();
  const authorized = user?.role === 'admin' || authorId === user?.id;

  return (
    <>
      {authorized && (
        <>
          <Button
            size="small"
            variant="contained"
            component={RouterLink}
            to={`/questionario/${formId}/editar`}
          >
            Editar
          </Button>
          <Button size="small" variant="contained">
            Apagar
          </Button>
        </>
      )}
      <Button
        size="small"
        variant="contained"
        component={RouterLink}
        to={`/questionario/${formId}/responder`}
      >
        Responder
      </Button>{' '}
    </>
  );
}
