"use client";

import "@/assets/ai.css";
import AddNewItemsFromAiComponent from "@/components/fragments/AddNewItemsFromAi";
import AIFormComponents from "@/components/fragments/AIFormComponents";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ListPlusIcon } from "lucide-react";
import { checkListFromAI } from "@/lib/check-list-form-ai";
import { HyperText } from "@/components/ui/hyper-text";

interface Chat {
  role: "user" | "assistant";
  content: string;
  status: "loading" | "success" | "failed";
}

export default function AssistantPage() {
  const [chat, setChat] = useState<Chat[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsAddToContainer, setItemsAddToContainer] = useState<string[]>([]);
  const [mount, setMount] = useState(false);

  const md = new MarkdownIt();
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const localChat = JSON.parse(sessionStorage.getItem("chat") || "[]");
    setChat(localChat);
    setMount(true);
  }, []);

  return (
    <>
      <div className="w-full h-calc-screen-minus-80 overflow-y-auto px-2 sm:px-14 md:px-20 xl:px-36">
        {!mount ? (
          <Loader />
        ) : (
          <div ref={parent} className="w-full h-full flex flex-col pt-14">
            {!chat.length ? (
              <InitialContent />
            ) : (
              chat.map((item, i) => {
                return item.status === "loading" ? (
                  <AILoader />
                ) : (
                  <div key={i}>
                    <div
                      className={cn(
                        item.role === "user"
                          ? "max-w-[85%] p-3 sm:p-4 my-4 justify-self-end self-end bg-card rounded-2xl text-sm sm:text-base"
                          : "w-full pt-3 sm:pt-4 my-1 text-sm sm:text-base",
                        item.status === "failed" &&
                          "w-fit p-2 sm:p-4 rounded-2xl bg-destructive text-destructive-foreground"
                      )}
                      dangerouslySetInnerHTML={{ __html: md.render(item.content) }}
                    ></div>
                    {checkListFromAI(item.content)?.list && (
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          setItemsAddToContainer(checkListFromAI(item.content)?.list as string[]);
                        }}
                      >
                        <ListPlusIcon />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <div className="w-full fixed bottom-0 left-0 flex flex-col justify-center items-center px-2">
        <AIFormComponents
          setChat={setChat}
          setIsModalOpen={setIsModalOpen}
          setItemsAddToContainer={setItemsAddToContainer}
        />
        <h6 className="text-xs text-center py-2">Gemini AI can make mistakes. Check important info.</h6>
      </div>

      <AddNewItemsFromAiComponent
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        itemsAddToContainer={itemsAddToContainer}
      />
    </>
  );
}

function InitialContent() {
  return (
    <div className="w-full h-calc-screen-minus-80 flex justify-center items-center">
      <HyperText text="NEXCART ASSISTANT" duration={1000} className="text-3xl md:text-4xl font-semibold text-center" />
    </div>
  );
}

function Loader() {
  return (
    <div className="w-full h-calc-screen-minus-80 flex justify-center items-center">
      <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      </div>
    </div>
  );
}

function AILoader() {
  return (
    <div className="flex flex-col gap-4 my-6">
      <div className="flex flex-row gap-2">
        <div className="size-2 md:size-3 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="size-2 md:size-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="size-2 md:size-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
      <p>Lemiting Lemiting Lemiting</p>
    </div>
  );
}
