'use client'
import { error500 } from "@utils/errors/errorResponses";
import ErrorPage from "@components/Other/ErrorPage";

export default function Error({ reset }) {
    return (
        <ErrorPage error={error500} reset={reset}></ErrorPage>
    )
}