import {
  Box,
  Stack,
  Button,
  Text,
  useToast,
  Link,
  Heading,
  useColorModeValue
} from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { FormInputs } from './FormInputs';
import { positionService } from '@/api/positionAPI';
import { userService } from '@/api/userAPI';
import { useRouter } from 'next/router';
import { useState } from "react";
import { IUserFormData } from '@/types/user.interface';
import { IPosition } from '@/types/position.interface'

const schema = yup.object({
  email: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  hireDate: yup.string().required('Campo obrigatório'),
});

interface Props {
  positions: IPosition[];
}

export function RegisterForm({ positions }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const methods = useForm<IUserFormData>({
    resolver: yupResolver(schema)
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: IUserFormData) => {
    setIsLoading(true);
    try {
      const positionMatch = positions.find(p => p.position === data.idPosition);
      if (positionMatch) {
          data.idPosition = positionMatch.id;
      }

      await userService.createUser(data);
      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form action="" autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Novo por aqui?
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Cadastre-se abaixo e comece a planejar suas férias
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormInputs showPassword={showPassword} setShowPassword={setShowPassword} positions={positions} />
              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isLoading}
                >
                  Cadastrar
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Possui conta? <Link color={"blue.400"} href="/">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  )
}
