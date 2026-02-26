import { z } from "zod";
import { api } from "@/lib/axios";

export const organizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  entity_name: z.string().nullable().optional(),
  department_name: z.string().nullable().optional(),
  section_name: z.string().nullable().optional(),
  unit_name: z.string().nullable().optional(),
  sub_unit_name: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
});

export type Organization = z.infer<typeof organizationSchema>;

export async function getMyOrganizations(): Promise<Organization[]> {
  const { data } = await api.get<Organization[]>("/organizations/me/");
  return z.array(organizationSchema).parse(data);
}

/** Received organizations: GET /organizations/recived/ */
export async function getReceivedOrganizations(): Promise<Organization[]> {
  const { data } = await api.get<Organization[]>("/organizations/recived/");
  return z.array(organizationSchema).parse(data);
}
