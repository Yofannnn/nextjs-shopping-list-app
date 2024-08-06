import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { editContainerTitleToDB } from "../../redux/slice/container.slice";

const EditContainerComponent = ({
  containerId,
  containerTitle,
  handleButtonClick,
}: {
  containerId: string;
  containerTitle: string;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [inputTitle, setInputTitle] = useState("");
  const [inputInvalid, setInputInvalid] = useState(false);

  useEffect(() => {
    setInputTitle(containerTitle);
  }, [containerTitle]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onlySpacesPattern = /^\s*$/;

    if (!inputTitle || onlySpacesPattern.test(inputTitle)) {
      setInputInvalid(true);
      return;
    }

    if (inputTitle === containerTitle) {
      onOpenChange();
      return;
    }

    setInputInvalid(false);

    dispatch(editContainerTitleToDB({ containerId, newTitle: inputTitle }));

    onOpenChange();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={(e) => {
          onOpen();
          handleButtonClick(e);
        }}
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit {containerTitle} name
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="text"
                      variant="bordered"
                      label="Enter new title"
                      isInvalid={inputInvalid}
                      errorMessage="Please enter a valid title"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="primary"
                      variant="light"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="solid">
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditContainerComponent;
