'use client';
import { useEffect } from 'react';
import path from '@data/imgPath.json';

export const useImgPathChampion = (setImgPath) => {
    useEffect(() => {
        setImgPath(`${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.champion}`);
    }, [])
}

export const useImgPathItem = (setImgPath) => {
    useEffect(() => {
        setImgPath(`${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.item}`);
    }, [])
}