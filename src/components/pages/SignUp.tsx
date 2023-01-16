import { Stack, Button, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { ApiError, apiRequest } from '../../utils/apiRequest';
import { FormInput } from '../FormInput';

interface LogInBody {
  cpf: string;
  password: string;
  name: string;
}

export function SignUp() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [errorCode, setErrorCode] = useState<null | number>(null);

  useEffect(() => {
    if (user) navigate('/questionarios');
  }, [user]);

  const methods = useForm({
    defaultValues: {
      cpf: '',
      password: '',
      name: '',
    },
  });
  const mutation = useMutation(
    async (data: LogInBody) =>
      await apiRequest<void>('usuario', {
        body: data,
        method: 'POST',
      }),
    {
      onSuccess: () => navigate('/'),
      onError: (error: ApiError) => setErrorCode(error.code),
    }
  );

  const onSubmit: SubmitHandler<LogInBody> = (data) => {
    mutation.mutate(data);
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
          <FormInput id="name" label="Nome" required />
          <FormInput
            id="cpf"
            label="CPF (somente números)"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]{11}' }}
            required
          />
          <FormInput id="password" type="password" label="Senha" required />
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
          {errorCode && (
            <Typography color={'#ba000d'}>
              {errorCode === 409
                ? 'Usuário já cadastrado.'
                : `Erro desconhecido (${errorCode})`}
            </Typography>
          )}
          <Link component={RouterLink} to="/">
            Já tem conta? Faça login
          </Link>
        </Stack>
      </form>
    </FormProvider>
  );
}
