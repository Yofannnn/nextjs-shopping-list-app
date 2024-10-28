import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ClearTrashComponent from "./ClearTrash";
import RestoreAllComponent from "./RestoreAll";
import CardTrashComponent from "./CardTrash";
import { cn } from "@/lib/utils";
import { AlignJustify, AlignJustifyIcon } from "lucide-react";

const TrashComponent = ({ className }: { className: string }) => {
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
        className={cn(
          className,
          trashes && trashes?.length > 0 ? "opacity-100" : "opacity-50"
        )}
        onClick={() => {
          setIsDrawerOpen(true);
        }}
        disabled={trashes?.length === 0}
      >
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
            <DrawerDescription />
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
            <AlignJustifyIcon className="size-5 md:size-6" />
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
