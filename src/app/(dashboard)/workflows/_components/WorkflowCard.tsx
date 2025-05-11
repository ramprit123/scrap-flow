"use client"; // If you are using App Router in Next.js

import * as React from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; // Adjust the import path based on your project setup
import { cn } from "@/lib/utils"; // Assuming you have a utility for class merging
import { WorkflowStatus, type CreateWorkflowType } from "@/schema/workflow";
import type { WorkFlow } from "@prisma/client";
import { FileIcon, PlayIcon } from "lucide-react";

interface AnimatedCardProps {
  content?: React.ReactNode; // This is the content for the CardContent *child*
  footer?: React.ReactNode; // This is the content for the CardFooter *child*
  // Framer Motion animation properties
  initial?: any;
  animate?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  className?: string;
  workflow: WorkFlow;
}

export const WorkFlowCard: React.FC<AnimatedCardProps> = ({
  className,
  content,
  footer,
  initial = { opacity: 0, y: 20 }, // Default simple fade-in from slightly below
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5, ease: "easeOut" },
  workflow,
  ...props
}) => {
  const isDraft = workflow?.status === WorkflowStatus.Draft;
  const isPublished = workflow?.status === WorkflowStatus.Published;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className="cursor-pointer"
    >
      <Card className={cn("w-full max-w-sm", className)} {...props}>
        <CardHeader>
          <CardTitle>{workflow.name}</CardTitle>
          {workflow?.description && (
            <CardDescription className="flex items-center justify-between">
              {workflow?.description}
              {isDraft && <FileIcon className="h-full w-5 text-yellow-500" />}
              {isPublished && (
                <PlayIcon className="h-full w-5 text-green-500" />
              )}
            </CardDescription>
          )}
        </CardHeader>
        {content && <CardContent>{content}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  );
};
