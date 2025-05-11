import type { CreateWorkflowType } from "@/schema/workflow";
import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "actions/workflows/createWorkflow";

export const useCreateWorkflow = () => {
  return useMutation({
    mutationFn: async (data: CreateWorkflowType) => {
      const response = await createWorkflow(data);
      return response;
    },
  });
};
