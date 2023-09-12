"use client"

import { Box, Table, Tbody, Td, Th, Thead, Tr, Button, Spinner, Center, Input, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SetStateAction, useEffect, useState } from 'react';
import { userService } from '@/api/userAPI';
import { vacationService } from '@/api/vacationAPI';
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
  vacationPeriod: number;
  startVacation: string;
  endVacation: string;
}

interface Token {
  id: number;
  name: string;
  hireDate: Date;
  iat: number;
  exp: number;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedPeriod, setUpdatedPeriod] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });  
  const [deleteVacationId, setDeleteVacationId] = useState<number | null>(null);

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
  
  const handleDelete = async (vacationId: number) => {
    if (!token) {
      console.error("Token not available");
      return;
    }
  
    try {
      await vacationService.deleteVacation(vacationId, token);
      setUser(prev => prev ? { ...prev, vacations: prev.vacations.filter(v => v.id !== vacationId) } : null);
      openModal("Sucesso!", "Registro de férias deletado com sucesso.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (vacationId: number) => {
    setEditingId(vacationId);
  };

  const handleUpdate = async (vacationId: number) => {
    if (!token) {
      console.error("Token not available");
      return;
    }
  
    try {
      await vacationService.editVacation(vacationId, updatedPeriod, token);
      setUser(prev => prev ? {
        ...prev, 
        vacations: prev.vacations.map(v => v.id === vacationId ? { ...v, vacationPeriod: parseInt(updatedPeriod) } : v)
      } : null);
      setEditingId(null);
      setUpdatedPeriod("");
      openModal("Sucesso!", "Registro de férias editado com sucesso.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setUpdatedPeriod("");
  };

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!user || user.vacations.length === 0) {
    return (
      <Box>
        <h1>{ user ? "Nenhum registro de férias disponível" : "Não foi possível carregar os dados do usuário" }</h1>
        <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid" onClick={() => window.location.href='/user/vacation'}>
          Registrar Novas Férias
        </Button>
      </Box>
    );
  }

  const openModal = (title: string, message: string) => {
    setModalContent({ title, message });
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setModalContent({ title: "", message: "" });
  };

  return (
    <>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Data de Contratação</Th>
              <Th>Total de dias</Th>
              <Th>Início das Férias</Th>
              <Th>Final das Férias</Th>
              <Th>Ações</Th> {/* Coluna para os botões */}
            </Tr>
          </Thead>
          <Tbody>
            {user.vacations.map(vacation => (
              <Tr key={vacation.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{moment(user.hireDate).format('DD/MM/YYYY')}</Td>
                <Td>
                  {editingId === vacation.id ? (
                    <Input 
                      value={updatedPeriod} 
                      onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUpdatedPeriod(e.target.value)} 
                      size="sm" 
                    />
                  ) : (
                    vacation.vacationPeriod
                  )}
                </Td>
                <Td>{moment(vacation.startVacation).format('DD/MM/YYYY')}</Td>
                <Td>{moment(vacation.endVacation).format('DD/MM/YYYY')}</Td>
                <Td>
                  {editingId === vacation.id ? (
                    <>
                      <IconButton icon={<CheckIcon />} onClick={() => handleUpdate(vacation.id)} aria-label="Confirmar edição" colorScheme="green" />
                      <IconButton icon={<CloseIcon />} onClick={handleCancelEdit} aria-label="Cancelar edição" colorScheme="red" />
                    </>
                  ) : (
                    <>
                      <IconButton icon={<EditIcon />} onClick={() => handleEdit(vacation.id)} aria-label="Editar" />
                      <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(vacation.id)} aria-label="Excluir" colorScheme="red" />
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box marginTop="10">
        <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid" onClick={() => window.location.href='/user/vacation'}>
          Registrar Novas Férias
        </Button>
      </Box>
  
      {/* Modal de Confirmação */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalContent.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{modalContent.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}