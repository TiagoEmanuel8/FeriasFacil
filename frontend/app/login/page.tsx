"use client"

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
  FormErrorMessage
} from "@chakra-ui/react"
import { useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginService } from '@/api/loginAPI';
import router from 'next/router';
import jwt from 'jsonwebtoken';

interface ILoginFormData {
  email: string,
  password: string,
}

const schema: any = yup.object({
  email: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<ILoginFormData>({
    resolver: yupResolver(schema),
});

  const onSubmit = async (data: ILoginFormData) => {
    setIsLoading(true);
    try {
      const token = await loginService.login(data);

      localStorage.setItem('token', token);

      const decodedToken: any = jwt.decode(token);     

      if (decodedToken?.type === 'user') {
        window.location.href = '/user/dashboard';
      } else if (decodedToken?.type === 'adm') {
        window.location.href = '/admin/dashboard';
      }

      toast({
        title: "Sucesso",
        description: "Sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
          <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                outline='none'
                focusBorderColor='gray.600'
                placeholder='Digite seu email'
                {...register('email')}
              />
                <FormErrorMessage>
                  {errors.email?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password} isRequired>
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
              <FormErrorMessage>
                {errors.password?.message}
              </FormErrorMessage>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"center"}
              >
              <Button as="a" color={"blue.400"} href="/user/register" variant={"link"}>
              Criar conta
            </Button>
              </Stack>
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
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

