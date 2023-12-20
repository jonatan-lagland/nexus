'use client';
import { useEffect, useState } from 'react';
import path from '@data/imgPath.json';

export const useImgPathChampion = () => {
    return (`${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.champion}/`);
}

export const useImgPathItem = () => {
    return `${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.item}/`;
}