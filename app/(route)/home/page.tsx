"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ZodError } from "zod";
import { aclonica } from "@/lib/utils";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { CascadingOrgSelect } from "./_components/cascading-org-select";
import {
  createDocument,
  createDocumentRequestSchema,
  documentFormValidationSchema,
  getDocumentValidationMessage,
} from "./_lib/document";
import {
  getMyOrganizations,
  getReceivedOrganizations,
  type Organization,
} from "./_lib/organizations";
import { emptyParty } from "./_lib/constants";
import type { z } from "zod";

export default function Home() {
  const [sender, setSender] = useState(emptyParty);
  const [received, setReceived] = useState(emptyParty);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedSenderOrgId, setSelectedSenderOrgId] = useState<string | null>(null);
  const [selectedReceivedIds, setSelectedReceivedIds] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const { data: organizations } = useQuery({
    queryKey: ["organizations", "me"],
    queryFn: getMyOrganizations,
  });
  const { data: receivedOrganizations } = useQuery({
    queryKey: ["organizations", "received"],
    queryFn: getReceivedOrganizations,
  });

  useEffect(() => {
    if (organizations?.length && !selectedSenderOrgId) {
      const first = organizations[0];
      setSelectedSenderOrgId(first.id);
      setSender({
        entity: first.entity_name ?? "",
        department: first.department_name ?? "",
        section: first.section_name ?? "",
        unit: first.unit_name ?? "",
      });
    }
  }, [organizations, selectedSenderOrgId]);

  useEffect(() => {
    if (receivedOrganizations?.length && selectedReceivedIds.length === 0) {
      const first = receivedOrganizations[0];
      setSelectedReceivedIds([first.id]);
      setReceived({
        entity: first.entity_name ?? "",
        department: first.department_name ?? "",
        section: first.section_name ?? "",
        unit: first.unit_name ?? "",
      });
    }
  }, [receivedOrganizations, selectedReceivedIds.length]);

  const createDocumentMutation = useMutation({
    mutationFn: ({
      payload,
      senderOrganizationId,
      receivedOrganizationIds,
    }: {
      payload: z.infer<typeof createDocumentRequestSchema>;
      senderOrganizationId?: string | null;
      receivedOrganizationIds?: string[];
    }) =>
      createDocument(payload, {
        senderOrganizationId: senderOrganizationId ?? undefined,
        receivedOrganizationIds: receivedOrganizationIds?.length
          ? receivedOrganizationIds
          : undefined,
      }),
    onSuccess: () => {
      toast.success("Document submitted successfully.");
      const senderOrgs = queryClient.getQueryData<Organization[]>(["organizations", "me"]);
      const receivedOrgs = queryClient.getQueryData<Organization[]>(["organizations", "received"]);
      const firstSender = senderOrgs?.[0];
      const firstReceived = receivedOrgs?.[0];
      setSender(
        firstSender
          ? {
              entity: firstSender.entity_name ?? "",
              department: firstSender.department_name ?? "",
              section: firstSender.section_name ?? "",
              unit: firstSender.unit_name ?? "",
            }
          : emptyParty
      );
      setSelectedReceivedIds(firstReceived ? [firstReceived.id] : []);
      setReceived(
        firstReceived
          ? {
              entity: firstReceived.entity_name ?? "",
              department: firstReceived.department_name ?? "",
              section: firstReceived.section_name ?? "",
              unit: firstReceived.unit_name ?? "",
            }
          : emptyParty
      );
      setTitle("");
      setContent("");
      setNotes("");
    },
  });

  function handleSenderOrgChange(orgId: string | null) {
    if (!orgId) {
      setSelectedSenderOrgId(null);
      setSender(emptyParty);
      return;
    }
    const org = organizations?.find((o) => o.id === orgId);
    if (org) {
      setSelectedSenderOrgId(org.id);
      setSender({
        entity: org.entity_name ?? "",
        department: org.department_name ?? "",
        section: org.section_name ?? "",
        unit: org.unit_name ?? "",
      });
    }
  }

  function handleAddReceived(orgId: string | null) {
    if (!orgId) return;
    setSelectedReceivedIds((prev) =>
      prev.includes(orgId) ? prev : [...prev, orgId]
    );
    const org = receivedOrganizations?.find((o) => o.id === orgId);
    if (org)
      setReceived({
        entity: org.entity_name ?? "",
        department: org.department_name ?? "",
        section: org.section_name ?? "",
        unit: org.unit_name ?? "",
      });
  }

  function handleRemoveReceived(id: string) {
    const nextIds = selectedReceivedIds.filter((x) => x !== id);
    setSelectedReceivedIds(nextIds);
    const first = nextIds[0]
      ? receivedOrganizations?.find((o) => o.id === nextIds[0])
      : null;
    setReceived(
      first
        ? {
            entity: first.entity_name ?? "",
            department: first.department_name ?? "",
            section: first.section_name ?? "",
            unit: first.unit_name ?? "",
          }
        : emptyParty
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      documentFormValidationSchema.parse({
        senderOrganizationId: selectedSenderOrgId ?? "",
        receivedOrganizationIds: selectedReceivedIds,
        title: title.trim(),
        content: content.trim(),
        notes: notes.trim(),
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const message = getDocumentValidationMessage(err as z.ZodError);
        toast.error(message);
        return;
      }
    }
    try {
      const payload = createDocumentRequestSchema.parse({
        sender,
        received,
        title: title.trim(),
        content: content.trim(),
        notes: notes.trim() || undefined,
      });
      createDocumentMutation.mutate({
        payload,
        senderOrganizationId: selectedSenderOrgId ?? undefined,
        receivedOrganizationIds:
          selectedReceivedIds.length > 0 ? selectedReceivedIds : undefined,
      });
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
            <CascadingOrgSelect
              organizations={organizations ?? []}
              value={selectedSenderOrgId}
              onChange={handleSenderOrgChange}
              placeholder="Select sender organization"
              disabled={!organizations?.length}
            />
          </section>

          <section className="mt-10 space-y-4">
            <h2 className={`text-xl text-[#E9A3FB] ${aclonica.className}`}>
              received
            </h2>
            {selectedReceivedIds.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-3">
                {selectedReceivedIds.map((id) => {
                  const org = receivedOrganizations?.find((o) => o.id === id);
                  return (
                    <li
                      key={id}
                      className="flex items-center gap-2 rounded-md border border-[#E9A3FB]/50 bg-[#E9A3FB]/10 px-3 py-2 text-sm text-[#E9A3FB]"
                    >
                      <span>{org?.name || org?.entity_name || id}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveReceived(id)}
                        className="ml-1 rounded p-0.5 hover:bg-[#E9A3FB]/30 text-[#E9A3FB]"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <CascadingOrgSelect
              key={selectedReceivedIds.join(",")}
              organizations={receivedOrganizations ?? []}
              value={null}
              onChange={handleAddReceived}
              placeholder="Add received organization"
              disabled={!receivedOrganizations?.length}
            />
            <p className="text-xs text-[#E9A3FB]/70 mt-1">
              Select from the hierarchy above to add a recipient. You can add multiple.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className={`text-xl text-[#FF62FC] ${aclonica.className}`}>
              Title
            </h2>
            <input
              type="text"
              placeholder="Document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 w-full rounded-md border border-[#FF62FC] bg-transparent px-3 text-sm text-[#FF62FC] outline-none placeholder:text-[#FF62FC]/50 focus:ring-[#FF62FC]/40 focus:ring-[3px]"
            />
          </section>

          <section className="mt-10 space-y-4">
            <h2 className={`text-xl text-[#FF62FC] ${aclonica.className}`}>
              Detail
            </h2>
            <RichTextEditor
              id="document-content"
              label="content"
              placeholder="Write the content here..."
              value={content}
              onChange={setContent}
            />
            <div className="mt-6 space-y-2">
              <label className="text-sm text-[#FF62FC]/80">Notes (optional)</label>
              <input
                type="text"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="h-10 w-full rounded-md border border-[#FF62FC]/60 bg-transparent px-3 text-sm text-[#FF62FC] outline-none placeholder:text-[#FF62FC]/50"
              />
            </div>
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
