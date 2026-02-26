import { z } from "zod";
import { api } from "@/lib/axios";

const partySchema = z.object({
  entity: z.string(),
  department: z.string(),
  section: z.string(),
  unit: z.string(),
});

const contentSchema = z
  .string()
  .min(1, "Content is required")
  .refine(
    (html) => html.replace(/<[^>]*>/g, "").trim().length > 0,
    "Content is required"
  );

export const createDocumentRequestSchema = z.object({
  sender: partySchema,
  received: partySchema,
  title: z.string().min(1, "Title is required"),
  content: contentSchema,
  notes: z.string().optional(),
});

export const documentFormValidationSchema = z.object({
  senderOrganizationId: z.string().min(1, "Sender organization is required"),
  receivedOrganizationIds: z
    .array(z.string().min(1))
    .min(1, "Add at least one received organization"),
  title: z.string().min(1, "Title is required"),
  content: contentSchema,
  notes: z.string().optional(),
});

export type CreateDocumentRequest = z.infer<typeof createDocumentRequestSchema>;

export type DocumentValidationError = {
  path: string;
  message: string;
};

const receivedOrgItemSchema = z.object({
  organization: z.string().min(1),
  notes: z.string(),
  duration: z.number(),
  follow_up_org: z.string(),
});

const documentApiBodySchema = z.object({
  sender_organization: z.string().min(1),
  is_submitted: z.boolean(),
  document_category: z.number(),
  document_status: z.number(),
  document_type: z.number(),
  process_tracker: z.number(),
  received_organization: z.array(receivedOrgItemSchema).min(1),
  title: z.string(),
  content: z.string().min(1),
  signature: z.number(),
  signature_date: z.string(),
  notes: z.string(),
  is_payment_required: z.boolean(),
});

export type DocumentApiPayload = z.infer<typeof documentApiBodySchema>;

export function formatDocumentValidationErrors(
  err: z.ZodError
): DocumentValidationError[] {
  return err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}

export function getDocumentValidationMessage(err: z.ZodError): string {
  const errors = formatDocumentValidationErrors(err);
  return errors.map((e) => `${e.path}: ${e.message}`).join(". ");
}

export type CreateDocumentOptions = {
  senderOrganizationId?: string;
  receivedOrganizationIds?: string[];
  document_category?: number;
  document_status?: number;
  document_type?: number;
  process_tracker?: number;
  signature?: number;
  signature_date?: string;
};

const DEFAULT_DOCUMENT_CATEGORY = 11;
const DEFAULT_DOCUMENT_STATUS = 2;
const DEFAULT_DOCUMENT_TYPE = 33;
const DEFAULT_PROCESS_TRACKER = 7;
const DEFAULT_SIGNATURE = 2;

export async function createDocument(
  payload: CreateDocumentRequest,
  options?: CreateDocumentOptions
): Promise<unknown> {
  const parsed = createDocumentRequestSchema.parse(payload);

  const senderId =
    options?.senderOrganizationId?.trim() || parsed.sender.entity;
  const receivedIds =
    (options?.receivedOrganizationIds?.length ?? 0) > 0
      ? options!.receivedOrganizationIds!.map((id) => id.trim()).filter(Boolean)
      : [parsed.received.entity].filter(Boolean);

  if (!senderId) {
    throw new Error("Sender organization is required.");
  }
  if (receivedIds.length === 0) {
    throw new Error("At least one received organization is required.");
  }

  const signatureDate =
    options?.signature_date ??
    new Date().toISOString().slice(0, 10);

  const apiBody = documentApiBodySchema.parse({
    sender_organization: senderId,
    is_submitted: false,
    document_category: options?.document_category ?? DEFAULT_DOCUMENT_CATEGORY,
    document_status: options?.document_status ?? DEFAULT_DOCUMENT_STATUS,
    document_type: options?.document_type ?? DEFAULT_DOCUMENT_TYPE,
    process_tracker: options?.process_tracker ?? DEFAULT_PROCESS_TRACKER,
    received_organization: receivedIds.map((id) => ({
      organization: id,
      notes: "",
      duration: 1,
      follow_up_org: "",
    })),
    title: parsed.title,
    content: parsed.content,
    signature: options?.signature ?? DEFAULT_SIGNATURE,
    signature_date: signatureDate,
    notes: parsed.notes ?? "",
    is_payment_required: false,
  });

  const { data } = await api.post("/document/", apiBody);
  return data;
}
