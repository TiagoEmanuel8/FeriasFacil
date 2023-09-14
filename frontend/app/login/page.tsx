"use client"
import { Flex, Box, useColorModeValue, useToast, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { loginService } from '@/api/loginAPI';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { ILoginFormData } from '@/types/login.interface';
import { LoginHeader } from '@/components/LoginHeader';
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleLoginSubmit = async (data: ILoginFormData) => {
    setIsLoading(true);
    try {
      const token = await loginService.login(data);
      localStorage.setItem('token', token);
      const decodedToken: any = jwt.decode(token);     

      if (decodedToken?.type === 'user') {
        router.push('/user/dashboard');
      } else if (decodedToken?.type === 'adm') {
        router.push('/admin/dashboard');
      }

      toast({
        title: "Sucesso",
        description: "Login efetuado com sucesso",
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
        <LoginHeader />
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
        </Box>
      </Stack>
    </Flex>
  )
}
