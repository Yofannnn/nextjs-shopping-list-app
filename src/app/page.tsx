import { Button, Code } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <a href="https://yofann.vercel.app">
        <Code className="absolute top-4 right-3">developed by Yofan</Code>
      </a>
      <div className="w-full h-svh flex flex-col justify-center items-center">
        <div className="w-3/4 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl">
          <h1 className="text-xl pb-2">Shopping List App</h1>
          <p className="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            officiis velit id dolore exercitationem, vel quis vitae magni quod
            rerum laboriosam quidem commodi enim reiciendis! Provident hic
            laborum iure reprehenderit.
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
