import { TextField, TextFieldProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export function FormInput({ id, ...rest }: TextFieldProps & { id: string }) {
  const { register } = useFormContext(); // retrieve all hook methods
  return <TextField id={id} variant="filled" {...rest} {...register(id)} />;
}
