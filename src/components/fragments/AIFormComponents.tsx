import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Dispatch, SetStateAction, useState } from "react";
import { checkListFromAI } from "@/lib/check-list-form-ai";

interface Chat {
  role: "user" | "assistant";
  content: string;
  status: "loading" | "success" | "failed";
}

const AIFormComponents = ({
  setItemsAddToContainer,
  setIsModalOpen,
  setChat,
}: {
  setItemsAddToContainer: Dispatch<SetStateAction<string[]>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setChat: Dispatch<SetStateAction<Chat[]>>;
}) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const placeholders = [
    "Type your prompt, and let's get started.",
    "Let's dive in!",
    "Ready to transform your ideas?",
    "It starts with a prompt.",
    "Need an idea boost?",
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const onlySpacesPattern = /^\s*$/;
    if (!prompt || onlySpacesPattern.test(prompt)) return;

    setIsLoading(true);

    setChat((prev) => {
      const newChat = [
        { role: "user" as "user", content: prompt, status: "success" as "success" },
        { role: "assistant" as "assistant", content: "", status: "loading" as "loading" },
      ];
      const update = [...prev, ...newChat];
      sessionStorage.setItem("chat", JSON.stringify(update));
      return update;
    });

    try {
      const response = await fetch("/api/gemini-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!response.ok) throw new Error((await response.json()).statusText);

      const reader = response.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        setChat((prev) => {
          const update = [...prev];
          update[update.length - 1] = {
            role: "assistant",
            content: buffer,
            status: "success",
          };
          sessionStorage.setItem("chat", JSON.stringify(update));
          return update;
        });
      }

      // offer to user add item from ai
      const listFromAI = checkListFromAI(buffer);
      if (listFromAI) {
        setItemsAddToContainer(listFromAI.list);
        setIsModalOpen(true);
      }
    } catch (error: any) {
      setChat((prev) => {
        const update = [...prev];
        update[update.length - 1] = {
          role: "assistant",
          content: error.message,
          status: "failed",
        };
        sessionStorage.setItem("chat", JSON.stringify(update));
        return update;
      });
    } finally {
      setPrompt("");
      setIsLoading(false);
    }
  };

  return (
    <>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default AIFormComponents;
