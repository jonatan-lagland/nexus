'use client'
import { error500 } from "@utils/errorResponses";
import ErrorPage from "@components/ErrorPage";

export default function Error({ error, reset, }) {
    return (
        <ErrorPage error={error500} reset={reset}></ErrorPage>
    )
}