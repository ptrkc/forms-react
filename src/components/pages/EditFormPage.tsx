import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { CreatedForm, EditForm } from '../EditForm';
import { useApiRequest } from '../../hooks/useApiRequest';

export function EditFormPage() {
  const { id } = useParams();
  const { user } = useUser();

  const { data, isLoading } = useApiRequest<CreatedForm>(`questionario/${id}`, {
    token: user?.token,
  });

  if (isLoading) return <Typography>Carregando...</Typography>;

  if (user && data) {
    return <EditForm user={user} defaultValues={data} />;
  }

  return <Typography>Algo deu errado</Typography>;
}
