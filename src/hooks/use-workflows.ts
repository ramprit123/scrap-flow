import { getWorkflowsForUser } from 'actions/workflows/getWorkflowsForUser';
import { useQuery } from '@tanstack/react-query';

export function useWorkflows() {
  return useQuery({
    queryKey: ['workflows'],
    queryFn: getWorkflowsForUser,
  });
}