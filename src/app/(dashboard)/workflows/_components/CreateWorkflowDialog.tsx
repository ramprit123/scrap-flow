"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkflow } from "@/hooks/useCreateWorkflow";
import {
  createWorkflowSchema,
  type CreateWorkflowType,
} from "@/schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreateWorkflowDialog = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWorkflowType>({
    resolver: zodResolver(createWorkflowSchema),
  });

  const createWorkflow = useCreateWorkflow();

  const queryClient = useQueryClient();

  const onSubmit = (data: CreateWorkflowType) => {
    toast.loading("Creating workflow...", { id: `create-workflow` });
    createWorkflow.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
        // Invalidate workflows query to refetch latest data
        queryClient.invalidateQueries({ queryKey: ["workflows"] });
        toast.success("Workflow created successfully", {
          id: `create-workflow`,
        });
      },
      onError: (error) => {
        toast.error("Failed to create workflow", { id: `create-workflow` });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Create a new workflow to automate your tasks.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-muted-foreground">
              Title <span className="text-green-500">(required)</span>
            </Label>
            <Input
              {...register("name")}
              placeholder="Workflow name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-muted-foreground">
              Description
            </Label>
            <Textarea
              {...register("description")}
              placeholder="Workflow description (optional)"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createWorkflow.isPending}>
              {createWorkflow.isPending ? "Creating..." : "Create Workflow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
