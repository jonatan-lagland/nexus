'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const QueryProvider = ({ children }) => {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: { queries: { staleTime: 172800000 } }, // 48 hours
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};