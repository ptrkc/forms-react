import { IconButton, TextField, TextFieldProps } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFormContext } from 'react-hook-form';
import { Stack } from '@mui/system';

export function QuestionInput({
  id,
  index,
  remove,
  ...rest
}: TextFieldProps & {
  id: string;
  index: number;
  remove: (index: number) => void;
}) {
  const { register } = useFormContext();
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        sx={{ width: '100%' }}
        id={id}
        variant="filled"
        {...rest}
        {...register(id)}
      />
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => {
          remove(index);
        }}
      >
        <DeleteForeverIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}
