import { Button, Paper, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiError, apiRequest } from '../utils/apiRequest';
import { FormInput } from './FormInput';
import { User } from '../contexts/UserContext';
import { QuestionInput } from './QuestionInput';
import { getToday } from '../utils/getToday';

export interface Questions {
  description: string;
  id?: number | string;
}
export interface CreatedForm {
  name: string;
  description: string;
  date: string;
  questions: Questions[];
}

export function EditForm({
  user,
  defaultValues,
}: {
  user: User;
  defaultValues: CreatedForm;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<null | number>(null);

  const methods = useForm({
    defaultValues: { ...defaultValues, date: getToday(defaultValues.date) },
  });
  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 1 },
    control: methods.control,
    name: 'questions',
  });

  const removeIndex = (index: number) => {
    length = methods.getValues('questions').length;
    if (length < 2) return;

    remove(index);
  };

  const appendQuestion = () => {
    append({ description: '', id: `new-${Date.now()}` });
  };
  const mutation = useMutation(
    async (data: CreatedForm) =>
      await apiRequest<void>(`questionario/${id}`, {
        body: data,
        method: 'PATCH',
        token: user.token,
      }),
    {
      onSuccess: () => navigate('/questionarios'),
      onError: (error: ApiError) => setErrorCode(error.code),
    }
  );

  const onSubmit: SubmitHandler<CreatedForm> = (data) => {
    const newQuestions = data.questions.map((question) => {
      if (typeof question.id === 'string') {
        return { description: question.description };
      } else {
        return { ...question };
      }
    });
    mutation.mutate({ ...data, questions: newQuestions });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                Atualizar question??rio
              </Typography>
              <FormInput id="name" label="Nome" required />
              <FormInput id="description" label="Descri????o" required />
              <FormInput id="date" label="Data" type="date" required />
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
              {fields.map((field, index) => (
                <QuestionInput
                  id={`questions.${index}.description` as const}
                  index={index}
                  remove={removeIndex}
                  key={field.id}
                  required
                />
              ))}
              <Stack alignItems={'center'} justifyContent="center">
                <Button
                  type="button"
                  onClick={appendQuestion}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Adicionar pergunta
                </Button>
              </Stack>
            </Stack>
          </Paper>
          <Button type="submit" variant="contained">
            Atualizar formul??rio
          </Button>
          {errorCode && (
            <Typography color={'#ba000d'}>
              {errorCode && `Erro (${errorCode})`}
            </Typography>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
}
