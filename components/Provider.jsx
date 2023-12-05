"use client";

import { SessionProvider } from 'next-auth/react'

/* The entire website is wrapped around a SessionProvider to make session data globally available. */

const Provider = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider