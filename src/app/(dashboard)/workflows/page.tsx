"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkflows } from "@/hooks/use-workflows";
import { AlertCircleIcon, FolderIcon } from "lucide-react";
import { CreateWorkflowDialog } from "./_components/CreateWorkflowDialog";

const Workflows = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Workflows</h1>
          <p className="text-muted-foreground text-sm">
            A workflow is a collection of steps that are executed in order.
          </p>
        </div>
        <div className="flex items-center">
          <CreateWorkflowDialog />
        </div>
      </div>
      <div className="h-full">
        <UserWorkFlows />
      </div>
    </div>
  );
};

function UserWorkFlowsSkelton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-md" />
      ))}
    </div>
  );
}

function UserWorkFlows() {
  const { data: workflows, isError, isLoading } = useWorkflows();

  if (isLoading) {
    return <UserWorkFlowsSkelton />;
  }

  if (isError) {
    return (
      <Alert>
        <AlertCircleIcon className="text-warning h-6 w-6" />
        <AlertTitle>Loading Error</AlertTitle>
        <AlertDescription>
          Unable to load workflows. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows?.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <div className="flex max-w-md flex-col items-center gap-2 text-center">
          <div className="bg-muted rounded-full p-4">
            <FolderIcon className="text-muted-foreground h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold">No workflows found</h3>
          <p className="text-muted-foreground text-sm">
            Get started by creating your first workflow to automate your tasks.
          </p>
        </div>
        <CreateWorkflowDialog />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4"></div>
    </div>
  );
}
export default Workflows;
