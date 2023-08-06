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
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IUserFormData {
  fullName: string,
  email: string,
  password: string,
  position: string,
  hireDate: string,
  type: string,
  handleSubmit: () => void,
  onSubmit: () => void,
}

const schema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  position: yup.string().required(),
  hireDate: yup.string().required(),
  type: yup.string().required(),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserFormData>({
    resolver: yupResolver(schema)
  });

  function onSubmit(data: IUserFormData) {
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
      <form action="" autoComplete='off' onSubmit={handleSubmit(onSubmit, setErros)}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Novo por aqui?
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Cadastre se abaixo e comece a planejar suas férias
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Box>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Nome Completo</FormLabel>
                  <Input
                    type="text"
                    outline='none'
                    focusBorderColor='gray.600'
                    placeholder='Digite nome completo'
                    {...register('fullName')}
                  />
                  <p style={{ color: 'red' }}>{errors?.fullName?.message}</p>
                </FormControl>
              </Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  outline='none'
                  focusBorderColor='gray.600'
                  placeholder='exemplo@email.com'
                  {...register('email')}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    outline='none'
                    focusBorderColor='gray.600'
                    placeholder='exemplo@email.com'
                    {...register('password')}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box>
                  <FormControl id="position" isRequired>
                    <FormLabel>Cargo</FormLabel>
                    <Input
                      type="text"
                      outline='none'
                      focusBorderColor='gray.600'
                      {...register('position')}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="hireDate" isRequired>
                    <FormLabel>Data de Contratação</FormLabel>
                    <Input
                      type="date"
                      outline='none'
                      focusBorderColor='gray.600'
                      {...register('hireDate')}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="type" isRequired>
                    <FormLabel>Tipo</FormLabel>
                    <Input
                      type="string"
                      outline='none'
                      focusBorderColor='gray.600'
                      {...register('type')}
                    />
                  </FormControl>
                </Box>
              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Cadastrar
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                Possui conta? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  )
}
