import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onDelete }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Confirmar Exclusão</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Você tem certeza que deseja deletar essas férias?
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="red" mr={3} onClick={onDelete}>
          Deletar
        </Button>
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteConfirmationModal;
