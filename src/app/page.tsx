import { Button, Code } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <a href="https://yofann.vercel.app">
        <Code className="absolute top-4 right-3">developed by Yofan</Code>
      </a>
      <div className="w-full h-svh flex flex-col justify-center items-center">
        <div className="w-[90%] md:w-3/4 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl">
          <h1 className="text-xl pb-2">Shopping List App</h1>
          <p className="text-xs sm:text-sm md:text-base">
            This web application, built with Next.js and styled using NextUI and
            UI Shadcn, provides a comprehensive shopping list management tool.
            Developed in TypeScript, it allows users to add, delete, update, and
            view shopping items, with data stored in IndexedDB. The app supports
            dark and light themes, various sorting methods, and currency format
            settings for international users. It also includes undo-redo
            functionality and a trash bin for safely managing deleted items. A
            notable feature is the integration with Gemini AI, which enables
            users to add items to their shopping list directly from Gemini AI
            responses, enhancing the list management experience. The app&apos;s
            user-friendly interface and diverse customization options are
            further supported by Redux for efficient state management.
          </p>
        </div>
        <Link href="/create">
          <Button color="primary" variant="shadow" className="m-4">
            Start
          </Button>
        </Link>
      </div>
    </>
  );
}
