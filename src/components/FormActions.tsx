import { Button, ButtonGroup, Container } from '@mui/material';
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
    <ButtonGroup size="small" variant="contained">
      {authorized && (
        <>
          <Button>Editar</Button>
          <Button>Apagar</Button>
        </>
      )}
      <Button>Responder</Button>
    </ButtonGroup>
  );
}
