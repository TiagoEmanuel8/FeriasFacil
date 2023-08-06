"use client"

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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface ILoginFormData {
  email: string,
  password: string,
  handleSubmit: () => void,
  onSubmit: () => void,
}

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function SimpleCard() {
  const [showPassword, setShowPassword] = useState(false)

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
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form action="" autoComplete='off' onSubmit={handleSubmit(onSubmit, setErros)}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                outline='none'
                focusBorderColor='gray.600'
                placeholder='Digite seu email'
                {...register('email')}
              />
              <p style={{ color: 'red' }}>{errors?.email?.message}</p>
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
            <p style={{ color: 'red' }}>{errors?.password?.message}</p>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"center"}
              >
                {/* <Checkbox>Remember me</Checkbox> */}
                <Link color={"blue.400"}>Criar Conta</Link>
              </Stack>
              <Button
                type='submit'
                width='full'
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

