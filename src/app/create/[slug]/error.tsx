"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="w-full h-svh flex flex-col justify-center items-center gap-6">
      <div>
        <h2 className="text-7xl text-center">404</h2>
        <p className="text-xl text-center">{error.message}</p>
      </div>
      <Link href="/create" className="text-xl">
        <Button color="primary" variant="shadow">
          Back
        </Button>
      </Link>
    </div>
  );
}
