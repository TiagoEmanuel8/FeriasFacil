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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect, Fragment } from "react";
import jwt from 'jsonwebtoken';
import {
  addMonths,
  addDays,
  isAfter,
  isEqual,
  formatISO,
  setHours,
  startOfDay,
  format,
  subDays
} from "date-fns";

import { vacationService } from '@/api/vacationAPI';
import { userService } from '@/api/userAPI';

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
  const [vacationFields, setVacationFields] = useState([{ id: 1 }]);
  
  const toast = useToast();
  const token: any = window.localStorage.getItem('token');
  const decodedToken: any = jwt.decode(token);
  const id = decodedToken.id;

  useEffect(() => {
    async function getUserData() {
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

      try {
        const userData = await userService.getUser(id);
        setHireDate(new Date(userData.hireDate));
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    getUserData();
  }, [toast, userService]);

  const schema = yup.object().shape({
    // vacationPeriod: yup.number()
    // .min(5, "Escolha um valor entre 5 e 30 dias")
    // .max(30, "Escolha um valor entre 5 e 30 dias")
    // .test("validVacationPeriod", "Escolha valores entre 5 e 25", value => {
    //   return value !== undefined && ![26, 27, 28, 29].includes(value);
    // }),
    // startVacation: yup.date().required().test("startVacation", "A data de início das férias deve ser pelo menos 12 meses após a data de contratação", (value) => {
    //   if (!value || !hireDate) return false;
    //   const startVacationDate = startOfDay(value);
    //   const hireDatePlus12Months = startOfDay(addMonths(hireDate, 12));
    //   return isAfter(startVacationDate, hireDatePlus12Months);
    // }),
    // endVacation: yup.date().required().test("endVacation", `Altere o campo período férias`, (value, context) => {
    //   if (!value || !context.parent.startVacation || !context.parent.vacationPeriod) return false;
    //   const endVacationDate = startOfDay(value);
    //   const startVacationPlusNDays = subDays(startOfDay(addDays(new Date(context.parent.startVacation), context.parent.vacationPeriod)), 1);
    //   return isEqual(endVacationDate, startVacationPlusNDays);
    // }),
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
  const vacationPeriod: any = watch("vacationPeriod");

  useEffect(() => {
    if (startVacation && !isNaN(Date.parse(startVacation)) && vacationPeriod) {
      const startVacationDate = new Date(startVacation);
      const endVacationDate = addDays(startVacationDate, vacationPeriod);
      
      if (endVacationDate instanceof Date && !isNaN(endVacationDate.getTime())) {
        setValue("endVacation", format(endVacationDate, 'yyyy-MM-dd'));
      }
    }
  }, [startVacation, setValue, vacationPeriod]);

  const onSubmit = async (data: IVacationFormData) => {
    const decodedToken: any = jwt.decode(token);
    const idUser = decodedToken.id;
    
    const { hireDate, ...requestData } = data;
    requestData.idUser = idUser;

    console.log(requestData)
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
        // window.location.href = '/user/dashboard';
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
              {vacationFields.map((field, index) => (
                <Fragment key={field.id}>
                  <FormControl id="vacationPeriod" isRequired>
                    <FormLabel>Período de férias</FormLabel>
                    <Input
                      type="number"
                      placeholder="Digite a quantidade de dias"
                      {...register(`vacationPeriod${field.id}`)}
                    />
                  </FormControl>
                  
                  <FormControl id="startVacation" isRequired>
                    <FormLabel>Início das férias</FormLabel>
                    <Input
                      type="date"
                      {...register(`startVacation${field.id}`, { valueAsDate: true })}
                    />
                  </FormControl>
                  
                  <FormControl id="endVacation">
                    <FormLabel>Final das férias</FormLabel>
                    <Input
                      type="date"
                      {...register(`endVacation${field.id}`, { valueAsDate: true })}
                    />
                  </FormControl>
                </Fragment>
              ))}
          </Box>
              {vacationFields.length < 3 && (
                <Button onClick={() => {
                  const newFieldId = vacationFields.length + 1;
                  setVacationFields(prevFields => [...prevFields, { id: newFieldId }]);
                }}>
                  Adicionar mais férias
                </Button>
              )}
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
