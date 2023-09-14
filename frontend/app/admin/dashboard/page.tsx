"use client"

import { SetStateAction, useEffect, useState } from 'react';
import { Box, Spinner, Center, Stack, Text, Link, useToast } from '@chakra-ui/react';
import { vacationService } from '@/api/vacationAPI';
import { VacationsTable } from '@/components/VacationTable';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
import { Vacation } from '@/types/vacation.interface';

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
    
    if (token) {
      fetchVacations();
    }
  }, [token]);

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
      setIsModalOpen(false);
    }
  };

  return (
    <Box>
      {loading ? (
        <Center mt={5}>
          <Spinner />
        </Center>
      ) : (
        <>
          <VacationsTable vacations={vacations} onDelete={(id: SetStateAction<number | null>) => {
            setSelectedVacationId(id);
            setIsModalOpen(true);
          }} />
          <DeleteConfirmationModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onDelete={() => handleDeleteVacation(selectedVacationId)}
          />
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