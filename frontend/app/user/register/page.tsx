"use client"

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
  useToast,
  FormErrorMessage,
  Select,
  Link
} from "@chakra-ui/react"
import React, { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { positionService } from '@/api/positionAPI';
import { userService } from '@/api/userAPI';

interface IUserFormData {
  email: string,
  password: string,
  name: string,
  idPosition: number | string,
  hireDate: string,
  type: string,
  handleSubmit: () => void,
  onSubmit: () => void,
}

interface Position {
  id: number;
  position: string;
  createdAt: string;
}

const schema: any = yup.object({
  email: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  hireDate: yup.string().required('Campo obrigatório'),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const toast = useToast();

  useEffect(() => {
    positionService.getPositions().then(setPositions);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserFormData>({
    resolver: yupResolver(schema)
  });

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
      window.location.href = '/';
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
                    {errors.name?.message}
                </FormErrorMessage>
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
                <FormErrorMessage>
                    {errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    outline='none'
                    focusBorderColor='gray.600'
                    placeholder='digite sua senha'
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
                <FormErrorMessage>
                    {errors.password?.message}
                </FormErrorMessage>
              </FormControl>
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
                      {errors.hireDate?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="type" isRequired>
                    <FormLabel>Tipo</FormLabel>
                    <Select placeholder="Selecione o tipo" defaultValue="user" {...register('type')}>
                      <option value="user">user</option>
                      <option value="adm">adm</option>
                  </Select>
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
    </Flex>
  )
}