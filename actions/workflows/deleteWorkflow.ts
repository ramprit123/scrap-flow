'use server'
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteWorkflow(workflowId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (!workflowId) {
    throw new Error("Workflow ID not provided");
  }
  try {
    const deletedWorkflow = await db.workFlow.delete({
      where: {
        workflowId,
      },
    });
    revalidatePath(`/workflows`);
    return { success: true, data: deletedWorkflow };
  } catch (error) {
    console.error("Error deleting workflow:", error);
    return { success: false, error: "Failed to delete workflow" };
  }
}
