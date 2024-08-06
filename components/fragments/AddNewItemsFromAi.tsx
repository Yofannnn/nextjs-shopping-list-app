import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addContainerToDB } from "../../redux/slice/container.slice";
import { addItemsToDB } from "../../redux/slice/items.slice";
import { addContainerTrashToDB } from "../../redux/slice/trash.slice";
import { addContainerInitialMoney } from "../../redux/slice/initmoney.slice";
import { Item } from "../../types/item.type";

const AddNewItemsFromAiComponent = ({
  isOpen,
  onOpenChange,
  itemsAddToContainer,
}: {
  isOpen: boolean;
  onOpenChange: (arg0: boolean) => void;
  itemsAddToContainer: string[];
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { containers } = useSelector((state: RootState) => state.container);
  const [newContainerTitle, setNewContainerTitle] = useState("");
  const [inputInvalid, setInputInvalid] = useState(false);

  const generateNewItem = (title: string) => {
    const newItem: Item = {
      id: uuidv4(),
      title,
      price: 0,
      checked: false,
      createdAt: new Date().getTime(),
      edit: false,
    };
    return newItem;
  };

  const handleAddNewItemsInExistingContainerFromAi = async (
    containerId: string
  ) => {
    for (const itemTitle of itemsAddToContainer) {
      const newItem = generateNewItem(itemTitle);
      await dispatch(addItemsToDB({ containerId, newItem }));
    }

    onOpenChange(false);
  };

  const handleAddNewItemsInNewContainer = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const onlySpacesPattern = /^\s*$/;
    if (!newContainerTitle || onlySpacesPattern.test(newContainerTitle)) {
      setInputInvalid(true);
      return;
    }

    const newContainerId = `rw-${uuidv4()}`;

    // create container
    dispatch(
      addContainerToDB({
        id: newContainerId,
        title: newContainerTitle,
        items: [],
      })
    );
    dispatch(addContainerTrashToDB({ id: newContainerId, items: [] }));
    dispatch(addContainerInitialMoney(newContainerId));

    // after create new container it will add all items from ai to newly created container
    for (const itemTitle of itemsAddToContainer) {
      const newItem = generateNewItem(itemTitle);
      await dispatch(addItemsToDB({ containerId: newContainerId, newItem }));
    }

    onOpenChange(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="inside"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Save suggestion from Ai?
          </ModalHeader>
          <ModalBody>
            <Tabs aria-label="Options" color="primary" radius="full">
              {containers.length !== 0 && (
                <Tab key="existing-containers" title="Existing Containers">
                  <div className="mt-3">
                    {containers.map((container) => (
                      <div
                        className="flex justify-between items-center px-2 py-3 hover:bg-neutral-300 dark:hover:bg-neutral-950 rounded-2xl"
                        key={container.id}
                      >
                        {container.title}
                        <Button
                          type="button"
                          color="primary"
                          onClick={() =>
                            handleAddNewItemsInExistingContainerFromAi(
                              container.id
                            )
                          }
                        >
                          Save
                        </Button>
                      </div>
                    ))}
                  </div>
                </Tab>
              )}
              <Tab key="create-container" title="Create Container">
                <form
                  onSubmit={handleAddNewItemsInNewContainer}
                  className="my-3"
                >
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
                    <Input
                      type="text"
                      variant="bordered"
                      radius="full"
                      label="Enter New Container Name"
                      isInvalid={inputInvalid}
                      errorMessage="Please enter a valid title"
                      onChange={(e) => setNewContainerTitle(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    color="primary"
                    radius="full"
                    className="w-full"
                  >
                    Create and Save
                  </Button>
                </form>
              </Tab>
              <Tab key="ingrediens" title="Ingredients">
                <ul className="list-disc pl-3 py-2">
                  {itemsAddToContainer.map((title, i) => (
                    <li key={i} className="">
                      {title}
                    </li>
                  ))}
                </ul>
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewItemsFromAiComponent;
