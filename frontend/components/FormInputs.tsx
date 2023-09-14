import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Select,
  Button,
} from "@chakra-ui/react";
import { useFormContext } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface Props {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  positions: any[];
}

export const FormInputs: React.FC<Props> = ({ showPassword, setShowPassword, positions }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <>
      {/* Nome Completo */}
      <Box>
        <FormControl id="name" isRequired>
          <FormLabel>Nome Completo</FormLabel>
          <Input
            type="text"
            outline='none'
            focusBorderColor='gray.600'
            placeholder='Digite nome completo'
            {...register('name')}
          />
          <FormErrorMessage>
            {typeof errors.name?.message === 'string' ? errors.name.message : ''}
          </FormErrorMessage>
        </FormControl>
      </Box>

      {/* Email */}
      <Box>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            outline='none'
            focusBorderColor='gray.600'
            placeholder='exemplo@email.com'
            {...register('email')}
          />
          <FormErrorMessage>
            {typeof errors.email?.message === 'string' ? errors.email.message : ''}
          </FormErrorMessage>
        </FormControl>
      </Box>

      {/* Senha */}
      <Box>
        <FormControl id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              outline='none'
              focusBorderColor='gray.600'
              placeholder='Digite sua senha'
              {...register('password')}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {typeof errors.password?.message === 'string' ? errors.password.message : ''}
          </FormErrorMessage>
        </FormControl>
      </Box>

      {/* Cargo */}
      <Box>
        <FormControl id="idPosition" isRequired>
          <FormLabel>Cargo</FormLabel>
          <Select placeholder="Selecione o cargo" {...register('idPosition')}>
            {positions.map(pos => (
              <option key={pos.id} value={pos.position}>
                {pos.position}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Data de Contratação */}
      <Box>
        <FormControl id="hireDate" isRequired>
          <FormLabel>Data de Contratação</FormLabel>
          <Input
            type="date"
            outline='none'
            focusBorderColor='gray.600'
            {...register('hireDate')}
          />
          <FormErrorMessage>
            {typeof errors.hireDate?.message === 'string' ? errors.hireDate.message : ''}
          </FormErrorMessage>
        </FormControl>
      </Box>
    </>
  );
};
