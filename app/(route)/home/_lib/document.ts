import { z } from "zod";
import { api } from "@/lib/axios";

const partySchema = z.object({
  entity: z.string().min(1, "Entity is required"),
  department: z.string().min(1, "Department is required"),
  section: z.string().min(1, "Section is required"),
  unit: z.string().min(1, "Unit is required"),
});

export const createDocumentRequestSchema = z.object({
  sender: partySchema,
  received: partySchema,
  content: z.string().min(1, "Content is required"),
});

export type CreateDocumentRequest = z.infer<typeof createDocumentRequestSchema>;

export type DocumentValidationError = {
  path: string;
  message: string;
};

// API payload shape expected by /document/
const documentApiBodySchema = z.object({
  sender_organization: z.string().min(1, "Sender organization is required"),
  received_organization: z
    .array(
      z.object({
        organization: z
          .string()
          .min(1, "Received organization is required"),
      })
    )
    .min(1, "At least one received organization is required"),
  content: z.string().min(1, "Content is required"),
});

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

export async function createDocument(
  payload: CreateDocumentRequest
): Promise<unknown> {
  // Validate the form payload first (field-level errors)
  const parsed = createDocumentRequestSchema.parse(payload);

  // Map to API body shape and validate again against API contract
  const apiBody = documentApiBodySchema.parse({
    sender_organization: parsed.sender.entity,
    received_organization: [
      {
        organization: parsed.received.entity,
      },
    ],
    content: parsed.content,
  });

  const { data } = await api.post("/document/", apiBody);
  return data;
}
