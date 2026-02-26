"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ZodError } from "zod";
import { aclonica } from "@/lib/utils";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import {
  createDocument,
  createDocumentRequestSchema,
  getDocumentValidationMessage,
} from "./_lib/document";
import { emptyParty, fieldKeys, fieldLabels } from "./_lib/constants";
import type { z } from "zod";

export default function Home() {
  const [sender, setSender] = useState(emptyParty);
  const [received, setReceived] = useState(emptyParty);
  const [content, setContent] = useState("");

  const createDocumentMutation = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success("Document submitted successfully.");
      setSender(emptyParty);
      setReceived(emptyParty);
      setContent("");
    },
  });

  function updateSender(field: (typeof fieldKeys)[number], value: string) {
    setSender((prev) => ({ ...prev, [field]: value }));
  }

  function updateReceived(field: (typeof fieldKeys)[number], value: string) {
    setReceived((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload = createDocumentRequestSchema.parse({
        sender,
        received,
        content,
      });
      createDocumentMutation.mutate(payload);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = getDocumentValidationMessage(err as z.ZodError);
        toast.error(message);
      }
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-[#E9A3FB]">
      <Image
        src="/loginL.png"
        alt=""
        width={100}
        height={75}
        className="pointer-events-none select-none fixed left-0 top-0 z-20"
      />
      <Image
        src="/loginR.png"
        alt=""
        width={100}
        height={75}
        className="pointer-events-none select-none fixed right-0 top-0 z-20"
      />

      <Image
        src="/footer.png"
        alt=""
        width={1710}
        height={418}
        className="pointer-events-none select-none fixed bottom-0 left-1/2 -translate-x-1/2 z-0"
      />

      <header className="relative z-10 flex w-full justify-between px-4 pt-4">
        <Image
          src="/headerL.png"
          alt=""
          width={800}
          height={418.53}
          className="object-contain object-left"
        />
        <Image
          src="/headerR.png"
          alt=""
          width={800}
          height={418.53}
          className="object-contain object-right"
        />
      </header>

      <section className="relative z-10 mx-20 flex min-h-screen max-w-5xl flex-col px-8 pt-8 pb-24">
        <div className="mb-10">
          <Image
            src="/logo.png"
            alt=""
            width={280}
            height={40}
            className="object-contain object-left"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 rounded-2xl"
        >
          <section className="space-y-4">
            <h2 className={`text-xl text-[#E9A3FB] ${aclonica.className}`}>
              sender
            </h2>
            <div className="grid gap-4 md:grid-cols-4 w-full">
              {fieldLabels.map((label, i) => (
                <FloatingInput
                  key={`sender-${label}`}

                  id={`sender-${fieldKeys[i]}`}
                  label={label.toLowerCase()}
                  type="text"
                  value={sender[fieldKeys[i]]}
                  className="h-[77px]"
                  onChange={(e) => updateSender(fieldKeys[i], e.target.value)}
                />
              ))}
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className={`text-xl text-[#E9A3FB] ${aclonica.className}`}>
              received
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              {fieldLabels.map((label, i) => (
                <FloatingInput
                  key={`received-${label}`}
                  id={`received-${fieldKeys[i]}`}
                  label={label.toLowerCase()}
                  type="text"
                  value={received[fieldKeys[i]]}
                  className="h-[77px]"
                  onChange={(e) => updateReceived(fieldKeys[i], e.target.value)}
                />
              ))}
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className={`text-xl text-[#FF62FC] ${aclonica.className}`}>
              Detail
            </h2>
            <FloatingTextarea
              id="document-content"
              label="content"
              placeholder="Write the content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mt-8 flex justify-center">
              <div className="relative h-[77px] w-[277px] cursor-pointer">
              <Image
                src="/loginButton.png"
                alt=""
                fill
                className="object-cover"
              />
              <button
                type="submit"
                disabled={createDocumentMutation.isPending}
                className={`absolute inset-0 flex items-center justify-center text-2xl text-white disabled:opacity-70 ${aclonica.className}`}
              >
                {createDocumentMutation.isPending ? "..." : "NEXT"}
              </button>
              </div>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}
