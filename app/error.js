'use client'
import { error500 } from "@utils/errorResponses";

export default function Error({ error, reset, }) {
    return (
        <ErrorPage error={error500} reset={reset}></ErrorPage>
    )
}