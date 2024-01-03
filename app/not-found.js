'use client'
import React from 'react';
import { error404 } from '@utils/errorResponses';
import ErrorPage from '@components/ErrorPage';

export default function NotFound({ error }) {
    return (
        <ErrorPage error={error404} reset={null}></ErrorPage>
    )
};