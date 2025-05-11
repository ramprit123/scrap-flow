import { z } from "zod";
export enum WorkflowStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
  Archived = "ARCHIVED",
}

export const createWorkflowSchema = z.object({
  name: z
    .string()
    .min(1, "Workflow name is required")
    .max(50, "Workflow name must be less than 50 characters"),
  description: z.string().optional(),
});

export type CreateWorkflowType = z.infer<typeof createWorkflowSchema>;

