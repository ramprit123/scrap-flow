import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/waitFor";
import React, { Suspense } from "react";

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
          <button className="btn btn-primary">Create Workflow</button>
        </div>
      </div>
      <div className="h-full">
        <Suspense fallback={<UserWorkFlowsSkelton />}>
          <UserWorkFlows />
        </Suspense>
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

async function UserWorkFlows() {
  await waitFor(6000);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4"></div>
    </div>
  );
}
export default Workflows;
