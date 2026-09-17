import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 15, // Unused data is kept in cache for 15 minutes
      retry: 1, // Retry failed queries once
      refetchOnWindowFocus: false, // Avoid refetching simply on tab focus switch
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
