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
} from "@chakra-ui/react";
import { useState, useEffect, Fragment, useCallback } from "react";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { format } from 'date-fns';
import { vacationService } from '@/api/vacationAPI';
import { userService } from '@/api/userAPI';

type DecodedJwt = { id?: number } & JwtPayload;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [hireDate, setHireDate] = useState<Date | null>(null);
  const [endDates, setEndDates] = useState<(Date | null)[]>([]);
  const [vacationFields, setVacationFields] = useState([{ id: 1 }]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [calculatedEndDates, setCalculatedEndDates] = useState<string[]>([]);
  const [token, setToken] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    const clientToken = window.localStorage.getItem('token');
    setToken(clientToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const decodedToken: any = jwt.decode(token);
    const userId = decodedToken?.id;

    if (!userId) return;

    async function getUserData() {
      try {
        const userData = await userService.getUser(userId);
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
  }, [token]);

  const handleInputChange = (name: string, value: any) => {
    if (name.startsWith('endVacation') || name.startsWith('startVacation')) {
      const dateObj = new Date(value);
      if (isNaN(dateObj.getTime())) return;
    }

    setFormData(prevState => {
      let updatedFormData = { ...prevState, [name]: value };
      const fieldId = name.match(/\d+$/);
      if (fieldId && (name.startsWith('startVacation') || name.startsWith('vacationPeriod'))) {
        const period = updatedFormData[`vacationPeriod${fieldId}`];
        const startDateStr = updatedFormData[`startVacation${fieldId}`];

        if (period && startDateStr) {
          const startDate = new Date(startDateStr);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + Number(period) - 1);
          updatedFormData[`endVacation${fieldId}`] = formatDate(endDate);
        }
      }
      return updatedFormData;
    });
  };

  const formatDate = useCallback((date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const decoded = jwt.decode(token) as DecodedJwt;

    if (!decoded || !decoded.id) return;

    const { id: idUser, name, hireDate } = decoded;

    const vacations = vacationFields.map(({ id }, index) => {
      const vacationPeriod = formData[`vacationPeriod${id}`];
      const startVacation = formData[`startVacation${id}`];
      const endVacation = calculatedEndDates[index] || '';

      if (vacationPeriod && startVacation && endVacation) {
        return {
          vacationPeriod: Number(vacationPeriod),
          startVacation: formatDate(new Date(startVacation)),
          endVacation: formatDate(new Date(endVacation))
        };
      }
      return null;
    }).filter(Boolean);

    const requestData = {
      idUser,
      name,
      hireDate,
      vacations
    };

    setIsLoading(true);
    try {
      await vacationService.createVacation(requestData, token);
      console.log(requestData)
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

  useEffect(() => {
    const newEndDates: string[] = vacationFields.map((field) => {
      const period: any = formData[`vacationPeriod${field.id}`];
      const startDateStr: any = formData[`startVacation${field.id}`];

      if (period && startDateStr) {
        const startDate = new Date(startDateStr);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + Number(period) - 1);
        return formatDate(endDate);
      }
      return '';
    });
    setCalculatedEndDates(newEndDates);
  }, [formData, vacationFields, formatDate]);

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
      <form action="" autoComplete='off' onSubmit={onSubmit}>
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
                      value={formData[`vacationPeriod${field.id}`] || ''}
                      onChange={(e) => handleInputChange(`vacationPeriod${field.id}`, e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl id="startVacation" isRequired>
                    <FormLabel>Início das férias</FormLabel>
                    <Input
                      type="date"
                      value={formData[`startVacation${field.id}`] || ''}
                      onChange={(e) => handleInputChange(`startVacation${field.id}`, e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="endVacation">
                    <FormLabel>Final das férias</FormLabel>
                    <Input
                        type="date"
                        value={endDates[index] && endDates[index] !== null ? formatDate(endDates[index] as Date) : formData[`endVacation${field.id}`] || ''}
                        onChange={(e) => handleInputChange(`endVacation${field.id}`, e.target.value)}
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