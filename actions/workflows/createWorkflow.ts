"use server";

import {
  createWorkflowSchema,
  WorkflowStatus,
  type CreateWorkflowType,
} from "@/schema/workflow";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createWorkflow(formData: CreateWorkflowType) {
  try {
    const { success, data } = createWorkflowSchema.safeParse(formData);
    if (!success) {
      throw new Error("Invalid form data");
    }
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const { name, description } = data;
    const workflow = await db.workFlow.create({
      data: {
        status: WorkflowStatus.Draft, // TODO: add status to schem
        definition: "TODO",
        name,
        description,
        userId,
      },
    });

    if (!workflow) {
      throw new Error("Failed to create workflow");
    }

    revalidatePath(`/workflows/editor/${workflow.workflowId.toString()}`);
  } catch (error) {
    console.error("Error creating workflow:", error);
    return { success: false, error: "Failed to create workflow" };
  }
}
