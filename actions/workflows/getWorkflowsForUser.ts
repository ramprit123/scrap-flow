"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";

export async function getWorkflowsForUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  return await db.workFlow.findMany({
    where: {
      userId,
    },
  });
}
