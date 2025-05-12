import { useMutation } from "@tanstack/react-query";
import { deleteWorkflow } from "actions/workflows/deleteWorkflow";

export const useDeleteWorkflow = () => {
  return useMutation({
    mutationFn: (workflowId: string) => deleteWorkflow(workflowId),
  });
};
