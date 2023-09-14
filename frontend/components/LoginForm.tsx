import { 
  FormControl, FormLabel, Input, Button, 
  InputGroup, InputRightElement, FormErrorMessage, Stack 
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ILoginFormData, ILoginFormProps } from '@/types/login.interface';

const schema = yup.object({
  email: yup.string().required('Campo obrigatório').email('Email inválido'),
  password: yup.string().required('Campo obrigatório'),
});

export const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder='Digite seu email'
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder='Digite sua senha'
              {...register('password')}
            />
            <InputRightElement>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
          Login
        </Button>
      </Stack>
    </form>
  );
}
