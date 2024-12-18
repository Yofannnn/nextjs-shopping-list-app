import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/input";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
} from "@/components/ui/animated-modal";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addContainerToDB } from "@/redux/slice/container.slice";
import { addItemsToDB } from "@/redux/slice/items.slice";
import { addContainerTrashToDB } from "@/redux/slice/trash.slice";
import { addContainerInitialMoney } from "@/redux/slice/initmoney.slice";
import { Item } from "@/types/item.type";

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
    <ModalProvider open={isOpen} setOpen={onOpenChange}>
      <ModalBody className="max-w-[500px] max-h-[90svh]">
        <ModalContent className="w-full h-full px-4 py-5 md:p-8 overflow-y-auto">
          <Tabs
            aria-label="Options"
            color="primary"
            radius="full"
            className="w-full"
          >
            {containers.length !== 0 && (
              <Tab
                key="existing-containers"
                title="Existing Containers"
                className="w-full"
              >
                <div className="mt-3">
                  {containers.map((container) => (
                    <div
                      className="flex justify-between items-center px-2 py-3 rounded-2xl border my-1 hover:bg-white hover:dark:bg-black"
                      key={container.id}
                    >
                      {container.title}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
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
              <form onSubmit={handleAddNewItemsInNewContainer} className="my-3">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
                  <Input
                    type="text"
                    variant="bordered"
                    radius="full"
                    label="Enter New Container Name"
                    isInvalid={inputInvalid}
                    errorMessage="Please enter a valid title"
                    onChange={(e) => setNewContainerTitle(e.target.value)}
                    endContent={
                      <Button type="submit" size="sm" className="rounded-full">
                        Create and Save
                      </Button>
                    }
                  />
                </div>
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
        </ModalContent>
        <ModalFooter className="px-4 pb-4 md:px-8 md:pb-8">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </ModalFooter>
      </ModalBody>
    </ModalProvider>
  );
};

export default AddNewItemsFromAiComponent;
