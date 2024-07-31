import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Trash2 } from "lucide-react";
import ClearTrashComponent from "./ClearTrash";
import RestoreAllComponent from "./RestoreAll";
import CardTrashComponent from "./CardTrash";

const TrashComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const trashes = useSelector(
    (state: RootState) => state.trash.containersTrash
  ).find((container) => container.id === slugContainerId)?.items;

  return (
    <>
      <button
        className={`${
          trashes && trashes?.length > 0 ? "opacity-100" : "opacity-50"
        } flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-nowrap`}
        onClick={() => {
          setIsDrawerOpen(true);
        }}
        disabled={trashes?.length === 0}
      >
        <Trash2 />
        Trash
      </button>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="outline-0 outline-transparent">
          <DrawerHeader>
            {trashes?.length !== 0 && (
              <DrawerTitle className="mx-auto w-[90vw] md:w-[50vw] flex justify-between">
                Trash
                <DropdownComponent />
              </DrawerTitle>
            )}
          </DrawerHeader>
          <div className="overflow-x-hidden overflow-y-auto py-2">
            <div className="mx-auto mb-5 w-[90vw] md:w-[50vw] max-h-[65vh]">
              {trashes?.length === 0 ? (
                <>
                  <h1 className="py-16 text-center">Trash Bin is Empty</h1>
                </>
              ) : null}
              {trashes ? (
                trashes.map((trash, i) => (
                  <CardTrashComponent key={i} trash={trash} />
                ))
              ) : (
                <>
                  <h1>Trash bin is empty</h1>
                </>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TrashComponent;

const DropdownComponent = () => {
  const [isAlertClearTrash, setIsAlertClearTrash] = useState(false);
  const [isAlertRestoreAll, setIsAlertRestoreAll] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit p-2">
          <DropdownMenuItem onClick={() => setIsAlertRestoreAll(true)}>
            Restore All Items
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsAlertClearTrash(true)}>
            Clear Trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RestoreAllComponent
        isAlertOpen={isAlertRestoreAll}
        setIsAlertOpen={setIsAlertRestoreAll}
      />
      <ClearTrashComponent
        isAlertOpen={isAlertClearTrash}
        setIsAlertOpen={setIsAlertClearTrash}
      />
    </>
  );
};
