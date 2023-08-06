"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
  useToast,
  Text
} from '@chakra-ui/react';

import { positionService } from '@/api/positionAPI';

interface IPositionFormData {
  position: string;
}

const schema = yup.object({
  position: yup.string().required('Campo obrigatório'),
});

export default function Position() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPositionFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IPositionFormData) => {
    setIsLoading(true);
    try {
      await positionService.createPosition(data);
      toast({
        title: "Sucesso",
        description: "Cargo criado com sucesso",
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
          <Heading fontSize={"4xl"}>Cadastre um cargo</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.position} isRequired>
                <FormLabel>Cargo</FormLabel>
                <Input
                  type="text"
                  placeholder='Digite o novo cargo'
                  {...register('position')}
                />
                <FormErrorMessage>
                  {errors.position?.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
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
                  Criar novo cargo
                </Button>
              </Stack>
            </Stack>
          </form>
            <Stack pt={6}>
                <Text align={"center"}>
                Voltar para <Link color={"blue.400"}>Dashboard</Link>
                </Text>
              </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
