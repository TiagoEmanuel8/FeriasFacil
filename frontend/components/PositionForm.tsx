import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IPositionFormData, IPositionFormProps } from '@/types/position.interface';

const schema = yup.object({
  position: yup.string().required('Campo obrigatório'),
});

export const PositionForm: React.FC<IPositionFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IPositionFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.position} isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input
            type="text"
            placeholder='Digite o novo cargo'
            {...register('position')}
          />
          <FormErrorMessage>
            {errors.position?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type='submit'
          width='full'
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          isLoading={isLoading}
        >
          Criar novo cargo
        </Button>
      </Stack>
    </form>
  );
}

