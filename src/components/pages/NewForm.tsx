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
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { ApiError, apiRequest } from '../../utils/apiRequest';
import { FormInput } from '../FormInput';
import { QuestionInput } from '../QuestionInput';

interface Questions {
  description: string;
  id?: number | string;
}
interface NewFormBody {
  name: string;
  description: string;
  date: string;
  questions: Questions[];
}

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function NewForm() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<null | number>(null);

  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      date: getToday(),
      questions: [{ description: '', id: `new-${Date.now()}` }],
    },
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
    async (data: NewFormBody) =>
      await apiRequest<void>('questionarios', {
        body: data,
        method: 'POST',
        token: user?.token,
      }),
    {
      onSuccess: () => navigate('/questionarios'),
      onError: (error: ApiError) => setErrorCode(error.code),
    }
  );

  const onSubmit: SubmitHandler<NewFormBody> = (data) => {
    const newQuestions = data.questions.map((question) => ({
      description: question.description,
    }));
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
                Novo questionário
              </Typography>
              <FormInput id="name" label="Nome" required />
              <FormInput id="description" label="Descrição" required />
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
            Criar formulário
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
