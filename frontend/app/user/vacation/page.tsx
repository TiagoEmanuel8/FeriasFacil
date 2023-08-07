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
  Text,
  useColorModeValue,
  Link,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { vacationService } from '@/api/vacationAPI';
import { userService } from '@/api/userAPI';
import { useState, useEffect } from "react";
import jwt from 'jsonwebtoken';

interface IVacationFormData {
  vacationPeriod: number,
  startVacation: string,
  endVacation: string,
  idUser: number,
  handleSubmit: () => void,
  onSubmit: () => void,
}

const schema = yup.object({
  vacationPeriod: yup.number().required(),
  startVacation: yup.string().required(),
  endVacation: yup.string().required(),
  idUser: yup.string().required(),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getUserData = async () => {
      const token = window.localStorage.getItem('token');
      if (!token) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para acessar essa página",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const decodedToken: any = jwt.decode(token);
      const id = decodedToken.id;

      try {
        const userData = await userService.getUser(id);
        console.log(userData);
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    getUserData();
  }, [toast, userService]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IVacationFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IVacationFormData) => {
    setIsLoading(true);
    try {
      await vacationService.createVacation(data);
      toast({
        title: "Sucesso",
        description: "Férias cadastradas com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.href = '/user/dashboard';
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
      <form action="" autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Planeje suas férias
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Preencha o formulário e pronto!
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
                <FormControl id="vacationPeriod" isRequired>
                  <FormLabel>Período férias</FormLabel>
                  <Input
                    type="number"
                    outline='none'
                    focusBorderColor='gray.600'
                    placeholder='Digite quantidade de dias'
                    {...register('vacationPeriod')}
                  />
                   <FormErrorMessage>
                    {errors.vacationPeriod?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
              <FormControl id="startVacation" isRequired>
                    <FormLabel>Início das férias</FormLabel>
                    <Input
                      type="date"
                      outline='none'
                      focusBorderColor='gray.600'
                      {...register('startVacation')}
                    />
                  <FormErrorMessage>
                    {errors.startVacation?.message}
                  </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="endVacation" isRequired>
                    <FormLabel>Final das férias</FormLabel>
                    <Input
                      type="date"
                      outline='none'
                      focusBorderColor='gray.600'
                      {...register('endVacation')}
                    />
                    <FormErrorMessage>
                      {errors.vacationPeriod?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="idUser" isRequired>
                    <FormLabel>Id de usuário</FormLabel>
                    <Input
                      type="string"
                      outline='none'
                      focusBorderColor='gray.600'
                      {...register('idUser')}
                    />
                    <FormErrorMessage>
                      {errors.idUser?.message}
                    </FormErrorMessage>
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
                  Registrar Férias
                  </Button>
              </Stack>
              <Stack pt={6}>
              <Text align={"center"}>
                Voltar para sua  <Button as="a" color={"blue.400"} href="/login" variant={"link"}>
              Conta
            </Button>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  )
}
