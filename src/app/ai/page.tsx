"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AddNewItemsFromAiComponent from "@/components/fragments/AddNewItemsFromAi";
import MarkdownIt from "markdown-it";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchContainer } from "@/redux/slice/container.slice";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AIPage() {
  const wrapperRef = useRef(null);
  const [itemsAddToContainer, setItemsAddToContainer] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [parent] = useAutoAnimate();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContainer());
  }, [dispatch]);

  useEffect(() => {
    if (itemsAddToContainer.length !== 0) setIsModalOpen(true);
  }, [itemsAddToContainer]);

  const combinedRef = useCallback(
    (element: any) => {
      wrapperRef.current = element;
      parent(element);
    },
    [parent]
  );

  return (
    <>
      <div className="w-full h-calc-screen-minus-80 flex justify-center overflow-y-auto">
        <div
          ref={combinedRef}
          className="wrapper-chat w-[95%] sm:w-[80%] md:w-[70%] flex flex-col h-fit"
        >
          {/* main  */}
        </div>
      </div>
      <div className="w-full fixed bottom-0 flex flex-col justify-center items-center px-2">
        <FormInput
          wrapperRef={wrapperRef}
          setItemsAddToContainer={setItemsAddToContainer}
          setIsModalOpen={setIsModalOpen}
        />
        <h6 className="text-xs text-center p-2">
          Gemini AI can make mistakes. Check important info.
        </h6>
      </div>
      <AddNewItemsFromAiComponent
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        itemsAddToContainer={itemsAddToContainer}
      />
    </>
  );
}

const FormInput = ({
  wrapperRef,
  setItemsAddToContainer,
  setIsModalOpen,
}: any) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const wrapper = wrapperRef.current;

  const placeholders = [
    "Bahan bahan untuk membuat rendang",
    "Cara membuat rendang",
    "Cara memasak ayam selain digoreng dan apa saja bahannya",
    "Olahan dari daging kambing beserta cara memasaknya",
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const onlySpacesPattern = /^\s*$/;
    if (!prompt || onlySpacesPattern.test(prompt)) return;

    // const wrapper = wrapperRef.current;
    if (wrapper) {
      const newElement = document.createElement("div");
      newElement.className =
        "max-w-[85%] p-3 sm:p-4 my-4 self-end bg-card rounded-2xl sm:rounded-3xl text-sm sm:text-base";
      newElement.textContent = prompt;
      wrapper.appendChild(newElement);
    }

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

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      const md = new MarkdownIt();
      const newElement = document.createElement("div");
      newElement.className = "max-w-full p-3 sm:p-4 my-1 text-sm sm:text-base";
      wrapper.appendChild(newElement);
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        newElement.innerHTML = md.render(buffer);
      }

      // offer to user add item from ai
      if (
        buffer.toLowerCase().includes("ingredient") ||
        buffer.toLowerCase().includes("bahan")
      ) {
        const ingredientPattern =
          /(\*\*(Bahan|Ingredients|Bahan-bahan):\*\*\n\n)((\* .*\n)+)/;
        const match = buffer.match(ingredientPattern);
        if (!match) return;
        const lines = match[0].split("\n");
        const heading = lines[0]; // The first line is the heading
        const ingredients = lines.slice(2).join("\n").replace(/^\* /gm, "");
        const ingredientsAddToContainer = ingredients
          .split("\n")
          .filter((string) => string.trim() !== "");
        setItemsAddToContainer(ingredientsAddToContainer);

        // push button to show modal
        const button = document.createElement("button");
        button.className = "w-fit ml-4 mb-4";
        const svgContainer = document.createElement("div");
        svgContainer.innerHTML = listPlusSVG();
        if (!svgContainer.firstElementChild) return;
        button.appendChild(svgContainer.firstElementChild);
        button.addEventListener("click", () => {
          setIsModalOpen(true);
        });
        wrapper.appendChild(button);
      }
    } catch (error: any) {
      const newElement = document.createElement("div");
      newElement.className = "max-w-full p-2 text-danger";
      newElement.textContent = error.message;
      wrapper.appendChild(newElement);
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

function listPlusSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-plus"><path d="M11 12H3"/><path d="M16 6H3"/><path d="M16 18H3"/><path d="M18 9v6"/><path d="M21 12h-6"/></svg>`;
}
