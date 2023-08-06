"use client"

      {/* <h1>Formulário de cadastro de novos usuários no sistema</h1>
      <p>Na tela de login, caso não tenha conta, o usuário será redirecionado para cá</p>
      <p>haverá um forms para cadastro de novos usuários férias</p>
      <p>após o submit, o usuário será redirecionado para tela de login</p> */}
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface ILoginFormData {
  cargo: string,
  handleSubmit: () => void,
  onSubmit: () => void,
}

const schema = yup.object({
  cargo: yup.string().required(),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormData>({
    resolver: yupResolver(schema)
  });

  function onSubmit(data: ILoginFormData) {
    console.log(data)
  }

    function setErros(error: any) {
  console.log('Errors', error)
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Cadastrar novo cargo</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form action="" autoComplete='off' onSubmit={handleSubmit(onSubmit, setErros)}>
          <Stack spacing={4}>
            <FormControl id="cargo">
              <FormLabel>Cargo</FormLabel>
              <Input
                type="cargo"
                outline='none'
                focusBorderColor='gray.600'
                placeholder='Digite o novo cargo'
                {...register('cargo')}
              />
              <p style={{ color: 'red' }}>{errors?.cargo?.message}</p>
            </FormControl>
           
            <Stack spacing={10}>
             
              <Button
                type='submit'
                width='full'
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Criar novo cargo
              </Button>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
