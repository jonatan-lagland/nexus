'use client'
import React from 'react';
import { error404 } from '@utils/errors/errorResponses';
import ErrorPage from '@components/Other/ErrorPage';

export default function NotFound({ error }) {
    return (
        <ErrorPage error={error404} reset={null}></ErrorPage>
    )
};