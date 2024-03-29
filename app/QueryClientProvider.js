'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const QueryProvider = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};