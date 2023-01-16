import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ApiError, apiRequest } from '../utils/apiRequest';
import { User } from '../contexts/UserContext';

interface Answer {
  description: string;
  questionId: number;
  userId?: number;
  formId: number;
}
export interface Questions {
  description: string;
  id: number;
}
export interface Form {
  name: string;
  description: string;
  date: string;
  questions: Questions[];
}

export function AnswerForm({
  user,
  data,
  formId,
}: {
  user: User;
  data: Form;
  formId: string;
}) {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<null | number>(null);

  const mutation = useMutation(
    async (data: Answer[]) =>
      await apiRequest<void>(`questionario/${formId}/resposta`, {
        body: { answers: data },
        method: 'POST',
        token: user.token,
      }),
    {
      onSuccess: () => navigate('/questionarios'),
      onError: (error: ApiError) => setErrorCode(error.code),
    }
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event?.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAnswersData: Answer[] = [];
    Array.from(formData).forEach(([key, value]) => {
      newAnswersData.push({
        questionId: Number(key),
        description: String(value),
        formId: Number(formId),
      });
    });
    console.log(newAnswersData);
    mutation.mutate(newAnswersData);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            width: '100%',
          }}
        >
          <Stack spacing={2} p={2}>
            <Typography variant="h5" fontWeight="bold">
              Responder questionário
            </Typography>
            <Typography>Nome: {data.name}</Typography>
            <Typography>Descrição: {data.description}</Typography>
            <Typography>Data: {data.date}</Typography>
          </Stack>
        </Paper>
        <Paper
          sx={{
            width: '100%',
          }}
        >
          <Stack spacing={2} p={2}>
            <Typography variant="h5" fontWeight="bold">
              Perguntas
            </Typography>
            <Stack direction="column" spacing={2}>
              {data.questions.map((question) => (
                <label key={question.id}>
                  <Typography variant="h6">{question.description}</Typography>
                  <TextField
                    name={String(question.id)}
                    variant="filled"
                    fullWidth={true}
                    required
                  />
                </label>
              ))}
            </Stack>
          </Stack>
        </Paper>
        <Button type="submit" variant="contained">
          Responder
        </Button>
        {errorCode && (
          <Typography color={'#ba000d'}>
            {errorCode && `Erro (${errorCode})`}
          </Typography>
        )}
      </Stack>
    </form>
  );
}
