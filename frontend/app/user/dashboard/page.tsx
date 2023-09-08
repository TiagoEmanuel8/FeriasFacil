"use client"

import { useEffect, useState } from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr, Button, Spinner, Center } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { userService } from '@/api/userAPI';
import jwt from 'jsonwebtoken';
import moment from 'moment';

interface User {
  id: number;
  email: string;
  name: string;
  hireDate: string;
  vacations: Vacation[];
}

interface Vacation {
  id: number;
  startVacation: string;
  endVacation: string;
}

interface Token {
  id: number;
  iat: number;
  exp: number;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      const decodedToken: any = jwt.decode(storedToken);
      const fetchData = async () => {
        try {
          const data = await userService.getUser(decodedToken.id);
          setUser(data);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, []);

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!user) {
    return (
      <Box>
        <h1>Não foi possível carregar os dados do usuário</h1>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Table>
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
            <Tr>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{moment(user.hireDate).format('DD/MM/YYYY')}</Td>
              <Td>
                {user.vacations.length > 0
                  ? moment(user.vacations[user.vacations.length - 1].startVacation).format('DD/MM/YYYY')
                  : '-'}
              </Td>
              <Td>
                {user.vacations.length > 0
                  ? moment(user.vacations[user.vacations.length - 1].endVacation).format('DD/MM/YYYY')
                  : '-'}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      {user.vacations.length === 0 && (
        <Box marginTop="10">
          <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid" onClick={() => window.location.href='/user/vacation'}>
            Registrar Novas Férias
          </Button>
        </Box>
      )}
    </>
  );
}
