'use client'
import path from '@data/imgPath.json';
import { useContext } from 'react';
import { GameVersionContext } from './context/gameVersionContext';

const baseUrl = "https://ddragon.leagueoflegends.com/cdn";
const profileIcon = "img/profileicon";
const itemIcon = "img/item"
const championIcon = "img/champion"
const placeholderIconSrc = "/assets/images/placeholder.webp"

export const useImagePathChampion = (championName) => {
    const gamePatch = useContext(GameVersionContext);
    if (!championName || !gamePatch) {
        return placeholderIconSrc
    }
    const src = `${baseUrl}/${gamePatch}/${championIcon}/${championName}.png`;
    return src;
}

export const useImagePathRune = (runePath) => {
    const gamePatch = useContext(GameVersionContext);
    if (!runePath || !gamePatch) {
        return placeholderIconSrc
    }
    const lowerCaseRunePath = runePath.toLowerCase();
    const src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${lowerCaseRunePath}`;
    return src;
}

export const useImgPathItem = () => {
    return `${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.item}/`;
}

export const useImagePathItem = (item) => {
    const gamePatch = useContext(GameVersionContext);
    if (!item || !gamePatch) {
        return placeholderIconSrc
    }

    if (item.id === 0) {
        return null;
    }

    if (item.id === 1) {
        return placeholderIconSrc;
    }

    const img = item.image;
    const src = `${baseUrl}/${gamePatch}/${itemIcon}/${img}`;
    return src;
}

export const useImagePathUser = (info) => {
    const gamePatch = useContext(GameVersionContext);
    if (!info || !gamePatch) {
        return placeholderIconSrc
    }
    const id = info.profileIconId;
    const src = `${baseUrl}/${gamePatch}/${profileIcon}/${id}.png`;
    return src;
}

export const usePathPlayer = (pathname, riotIdGameName, riotIdTagline) => {
    // Split the pathname into segments based on '/'
    const segments = pathname.split('/');
    // Remove the last segment
    segments.pop();
    const profilePath = segments.join('/') + '/';
    const playerPath = profilePath + riotIdGameName + '-' + riotIdTagline;
    return playerPath;
}
