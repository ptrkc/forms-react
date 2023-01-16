import { Button } from '@mui/material';
import { useMutation } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { apiRequest } from '../utils/apiRequest';

export function FormActions({
  formId,
  authorId,
}: {
  formId: number;
  authorId: number;
}) {
  const { user } = useUser();
  const authorized = user?.role === 'admin' || authorId === user?.id;

  const { mutateAsync } = useMutation(
    async () =>
      await apiRequest<void>(`questionario/${formId}`, {
        method: 'DELETE',
        token: user?.token,
      })
  );

  const deleteForm = async () => {
    const answer = window.confirm(
      'Tem certeza que seja apagar esse questionário?'
    );
    if (answer) {
      await mutateAsync();
    }
  };

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
          <Button onClick={deleteForm} size="small" variant="contained">
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
