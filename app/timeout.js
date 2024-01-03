'use client'
import ErrorPage from "@components/ErrorPage";

export default function Timeout({ error }) {

    // NOTE: Does NOT attempt to re-render the segment like in error.js. Instead, attempt to recover by reloading the page.
    // TODO: Implement a way to reload the parent component without the need to re-render the entire page
    const reset = () => {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    return (
        <ErrorPage error={error} reset={reset}></ErrorPage>
    )
}