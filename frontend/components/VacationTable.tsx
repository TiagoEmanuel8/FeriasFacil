import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { format, parseISO } from 'date-fns';
import { Vacation } from '@/types/vacation.interface'

interface Props {
  vacations: Vacation[];
  onDelete: (id: number) => void;
}

export const VacationsTable: React.FC<Props> = ({ vacations, onDelete }) => (
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
          <Td>{format(parseISO(vacation.user.hireDate), 'dd/MM/yyyy')}</Td>
          <Td>{format(parseISO(vacation.startVacation), 'dd/MM/yyyy')}</Td>
          <Td>{format(parseISO(vacation.endVacation), 'dd/MM/yyyy')}</Td>
          <Td>{vacation.vacationPeriod}</Td>
          <Td>
            <DeleteIcon cursor="pointer" onClick={() => onDelete(vacation.id)} />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
