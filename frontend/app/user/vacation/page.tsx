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
} from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IVacationFormData>({
    resolver: yupResolver(schema)
  });

  function onSubmit(data: IVacationFormData) {
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
                  <p style={{ color: 'red' }}>{errors?.vacationPeriod?.message}</p>
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
                Visão geral de sua <Link color={"blue.400"}>Conta</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  )
}
