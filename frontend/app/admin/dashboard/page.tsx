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
  Center
} from '@chakra-ui/react';
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

  return (
    <Box>
      {loading ? (
        <Center mt={5}>
          <Spinner />
        </Center>
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Data de Contratação</Th>
              <Th>Início das Férias</Th>
              <Th>Final das Férias</Th>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

