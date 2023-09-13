import { Table, Thead, Tbody, Tr, Th, Td, DeleteIcon } from '@chakra-ui/react';
import moment from 'moment';

interface Vacation {
  id: number;
  vacationPeriod: number;
  startVacation: string;
  endVacation: string;
  idUser: number;
  user: {
    id: number;
    email: string;
    name: string;
    hireDate: string;
    type: string;
  };
}

interface Props {
  vacations: Vacation[];
  onDelete: (id: number) => void;
}

const VacationsTable: React.FC<Props> = ({ vacations, onDelete }) => (
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
            <DeleteIcon cursor="pointer" onClick={() => onDelete(vacation.id)} />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default VacationsTable;
