import React from 'react'
import NotFound from '@app/not-found';
import Error from '@app/error';

export default function ErrorHandler({ error }) {
    if (error && error.status) {
        switch (error.status) {
            case 403:
            case 404:
                return <NotFound />;
            default:
                return <Error />;
        }
    }

    // If error does not have a status or is not an expected type, display generic error page
    return (
        <Error></Error>
    );
}