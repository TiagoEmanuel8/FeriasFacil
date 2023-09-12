"use client"

import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Stack,
  Link,
  Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { vacationService } from '@/api/vacationAPI';
import moment from 'moment';

interface User {
  id: number;
  email: string;
  name: string;
  hireDate: string;
  type: string;
}

interface Vacation {
  id: number;
  vacationPeriod: number;
  startVacation: string;
  endVacation: string;
  idUser: number;
  user: User;
}

export default function AdminDashboard() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacationId, setSelectedVacationId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    const clientToken = window.localStorage.getItem('token');
    setToken(clientToken);
  }, []);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await vacationService.getVacations();
        setVacations(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch vacations: ', error);
        setLoading(false);
      }
    };
    
    fetchVacations();
  }, []);

  const handleDeleteVacation = async (vacationId: number | null) => {
    if (!vacationId) return;

    try {
      if(!token) {
        throw new Error('Token not available.');
      }
      await vacationService.deleteVacation(vacationId, token);
      const updatedVacations = vacations.filter(v => v.id !== vacationId); 
      setVacations(updatedVacations);
      toast({
        title: "Férias deletadas.",
        description: "As férias foram deletadas com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(`Failed to delete vacation with ID: ${vacationId}`, error);
      toast({
        title: "Erro ao deletar.",
        description: "Ocorreu um erro ao tentar deletar as férias. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      closeModal();
    }
  };

  const openModal = (vacationId: number) => {
    setSelectedVacationId(vacationId);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedVacationId(null);
    setIsModalOpen(false);
  }

  return (
    <Box>
      {loading ? (
        <Center mt={5}>
          <Spinner />
        </Center>
      ) : (
        <>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Data de Contratação</Th>
                <Th>Início das Férias</Th>
                <Th>Final das Férias</Th>
                <Th>Total de Dias</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {vacations.map((vacation) => (
                <Tr key={vacation.id}>
                  <Td>{vacation.user.name}</Td>
                  <Td>{vacation.user.email}</Td>
                  <Td>{moment(vacation.user.hireDate).format('DD/MM/YYYY')}</Td>
                  <Td>{moment(vacation.startVacation).format('DD/MM/YYYY')}</Td>
                  <Td>{moment(vacation.endVacation).format('DD/MM/YYYY')}</Td>
                  <Td>{vacation.vacationPeriod}</Td>
                  <Td>
                    <DeleteIcon cursor="pointer" onClick={() => openModal(vacation.id)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmar Exclusão</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Você tem certeza que deseja deletar essas férias?
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={() => handleDeleteVacation(selectedVacationId)}>
                  Deletar
                </Button>
                <Button variant="ghost" onClick={closeModal}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
      <Stack pt={6}>
        <Text align={"center"}>
          Criar um novo <Link color={"blue.400"} href="/admin/position">Cargo</Link>
        </Text>
      </Stack>
    </Box>
  );
}

