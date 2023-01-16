import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useApiRequest } from '../../hooks/useApiRequest';
import { AnswerForm, Form } from '../AnswerForm';

export function AnswerFormPage() {
  const { id } = useParams();
  const { user } = useUser();

  const { data, isLoading } = useApiRequest<Form>(`questionario/${id}`, {
    token: user?.token,
  });

  if (isLoading) return <Typography>Carregando...</Typography>;

  if (user && data && id) {
    return <AnswerForm user={user} data={data} formId={id} />;
  }

  return <Typography>Algo deu errado</Typography>;
}
