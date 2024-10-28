"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addContainerToDB } from "@/redux/slice/container.slice";
import { Item } from "@/types/item.type";
import { addContainerInitialMoney } from "@/redux/slice/initmoney.slice";
import { addContainerTrashToDB } from "@/redux/slice/trash.slice";

const NewContainerComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [inputNewContainer, setInputNewContainer] = useState("");

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onlySpacesPattern = /^\s*$/;

    if (!inputNewContainer || onlySpacesPattern.test(inputNewContainer)) {
      setInputNewContainer("untitled");
      return;
    }

    const id = `c-${uuidv4()}`;
    const title = inputNewContainer;
    const items: Item[] = [];

    dispatch(addContainerToDB({ id, title, items }));

    dispatch(addContainerTrashToDB({ id, items }));

    dispatch(addContainerInitialMoney(id));

    setInputNewContainer("");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <form
        onSubmit={handleCreate}
        className="flex items-center mx-auto max-w-[400px] h-[70px] px-3 mt-[70px]"
      >
        <Input
          radius="full"
          type="text"
          label="Create Container List"
          value={inputNewContainer}
          onChange={(e) => setInputNewContainer(e.target.value)}
          endContent={
            <Button type="submit" className="rounded-full">
              Create
            </Button>
          }
        />
      </form>
    </>
  );
};

export default NewContainerComponent;
