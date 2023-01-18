import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { EditForm, GetForm } from '../EditForm';
import { useApiRequest } from '../../hooks/useApiRequest';

export function EditFormPage() {
  const { id } = useParams();
  const { user } = useUser();

  const { data, isLoading } = useApiRequest<GetForm>(`questionario/${id}`, {
    token: user?.token,
  });

  if (isLoading) return <Typography>Carregando...</Typography>;

  if (user && data) {
    const { id, ...dataWithoutId } = data;
    return <EditForm user={user} defaultValues={dataWithoutId} />;
  }

  return <Typography>Algo deu errado</Typography>;
}
