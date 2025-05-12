"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteWorkflow } from "@/hooks/deleteWorkFlow";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface DeleteWorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  workflowId: string;
  workflowName: string;
}
export const DeleteWorkflowDialog = ({
  isOpen,
  onClose,
  workflowId,
  workflowName,
}: DeleteWorkflowDialogProps) => {
  const { mutate: deleteWorkflow } = useDeleteWorkflow();
  const queryClient = useQueryClient();

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Workflow</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this workflow? This action cannot be
            undone.
            {workflowName}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              deleteWorkflow(workflowId, {
                onSuccess(data, variables, context) {
                  toast("Workflow deleted", {
                    description: "The workflow has been deleted successfully.",
                    icon: "🗑️",
                    style: { backgroundColor: "#f87171", color: "white" }, // Tailwind red-400 equivalent
                  });
                  onClose();
                  queryClient.invalidateQueries({ queryKey: ["workflows"] });
                },
                onError(error, variables, context) {
                  console.log(error);
                  toast("Failed to delete workflow", {
                    description: "There was an error deleting the workflow.",
                    icon: "❌",
                    style: { backgroundColor: "#f87171", color: "white" }, // Tailwind red-400 equivalent
                  });
                },
              })
            }
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
