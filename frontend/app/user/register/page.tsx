import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
  useToast,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { positionService } from '@/api/positionAPI';
import { PositionForm } from '@/components/PositionForm';
import { IPositionFormData } from '@/types/position.interface'

export default function Position() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
        <Heading textAlign={"center"} fontSize={"4xl"}>Cadastre um cargo</Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <PositionForm onSubmit={onSubmit} isLoading={isLoading} />
          <Text align={"center"} pt={6}>
            Voltar para <Link color={"blue.400"} href="/admin/dashboard">Dashboard</Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
