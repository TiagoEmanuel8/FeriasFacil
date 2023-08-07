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
import { addMonths, addDays, isAfter, isEqual, formatISO, setHours, startOfDay, format, subDays } from "date-fns";

interface IVacationFormData {
  vacationPeriod: number,
  startVacation: Date | string,
  endVacation: Date | string,
  idUser: number,
  hireDate?: Date | string,
}

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [hireDate, setHireDate] = useState<Date | null>(null);
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
        setHireDate(new Date(userData.hireDate));
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

  const schema = yup.object().shape({
    vacationPeriod: yup.number().required(),
    startVacation: yup.date().required().test("startVacation", "A data de início das férias deve ser pelo menos 12 meses após a data de contratação", (value) => {
      if (!value || !hireDate) return false;
      const startVacationDate = startOfDay(value);
      const hireDatePlus12Months = startOfDay(addMonths(hireDate, 12));
      return isAfter(startVacationDate, hireDatePlus12Months);
    }),
    endVacation: yup.date().required().test("endVacation", "A data final das férias deve ser exatamente 30 dias após a data de início das férias", (value, context) => {
      if (!value) return false;
      const endVacationDate = startOfDay(value);
      const startVacationPlus30Days = subDays(startOfDay(addDays(context.parent.startVacation, 30)), 1);
      return isEqual(endVacationDate, startVacationPlus30Days);
    }),
    idUser: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IVacationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      hireDate: hireDate || undefined,
    },
  });

  const startVacation: any = watch("startVacation");

  useEffect(() => {
    if (startVacation && !isNaN(Date.parse(startVacation))) {
      const startVacationDate = new Date(startVacation);
      const endVacationDate = addDays(startVacationDate, 30);
      if (endVacationDate instanceof Date && !isNaN(endVacationDate.getTime())) {
        setValue("endVacation", format(endVacationDate, 'yyyy-MM-dd'));
      }
    }
  }, [startVacation, setValue]);

  const onSubmit = async (data: IVacationFormData) => {
    const token = window.localStorage.getItem('token');
    const { hireDate, ...requestData } = data;

    setIsLoading(true);
    try {
      await vacationService.createVacation(requestData, token);
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Registrar férias</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>Preencha as informações abaixo para registrar suas férias</Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
      <form action="" autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
                  {...register('startVacation', { valueAsDate: true })}
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
                    {...register('endVacation', { valueAsDate: true })}
                  />
                    <FormErrorMessage>
                      {errors.endVacation?.message}
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
                   bg={'blue.400'}
                   color={'white'}
                   _hover={{
                     bg: 'blue.500',
                   }}
                   type="submit"
                   isLoading={isLoading}
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
      </Stack>
      </Box>
      </Stack>
    </Flex>
  )
}
