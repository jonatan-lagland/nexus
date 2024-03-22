'use client'
import path from '@data/imgPath.json';
import { useMemo } from 'react';
import { useContext } from 'react';
import { GameVersionContext } from './context/gameVersionContext';
import { ChampionListContext } from './context/championListContext';

const baseUrl = "https://ddragon.leagueoflegends.com/cdn";
const CDBaseUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default';
const profileIcon = "img/profileicon";
const itemIcon = "img/item"
const championIcon = "img/champion"
const placeholderIconSrc = "/assets/images/placeholder.webp"
const placeholderChampionSrc = "https://cdn.communitydragon.org/latest/champion/generic/square";

export const useImagePathChampion = (championKey) => {
    const gamePatch = useContext(GameVersionContext);
    const championList = useContext(ChampionListContext);
    const stringifiedKey = String(championKey);

    return useMemo(() => {
        if (!championKey || !gamePatch || !championList.data) {
            return placeholderChampionSrc;
        }

        // Loop through championList to find a champion key and subsequently return image 
        let championSrc = null;
        for (let champion in championList.data) {
            if (championList.data[champion].key === stringifiedKey) {
                championSrc = stringifiedKey;
                break;
            }
        }

        if (!championSrc) {
            return placeholderChampionSrc;
        }
        return `https://cdn.communitydragon.org/latest/champion/${stringifiedKey}/square`;
    }, [championKey, gamePatch, championList.data, stringifiedKey]);
};

export const useImagePathRune = (runePath) => {
    const gamePatch = useContext(GameVersionContext);
    if (!runePath || !gamePatch) {
        return placeholderIconSrc
    }
    const path = runePath.icon ? runePath.icon.toLowerCase() : runePath.toLowerCase();
    const src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${path}`;
    return src;
}

export const useImagePathSummonerSpell = (iconPath) => {
    if (!iconPath) {
        return placeholderIconSrc;
    }
    // Replace the base path and convert the rest to lowercase
    const modifiedPath = iconPath
        .replace('/lol-game-data/assets/', '')
        .toLowerCase();
    const src = `${CDBaseUrl}/${modifiedPath}`;
    return src;
}


export const useImgPathItem = () => {
    return `${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.item}/`;
}

export const useImagePathItem = (item) => {
    const gamePatch = useContext(GameVersionContext);
    return useMemo(() => {
        if (!item || !gamePatch) {
            return placeholderIconSrc;
        }

        if (item.id === 0) {
            return null;
        }

        if (item.id === 1) {
            return placeholderIconSrc;
        }

        const img = item.image;
        return `${baseUrl}/${gamePatch}/${itemIcon}/${img}`;
    }, [item, gamePatch]);
};

export const useImagePathUser = (info) => {

    if (!info) {
        return placeholderChampionSrc
    }
    const id = info.profileIconId;
    const src = `https://cdn.communitydragon.org/latest/profile-icon/${id}`;
    return src;
}

export const usePathPlayer = (pathname, riotIdGameName, riotIdTagline) => {
    const playerPath = useMemo(() => {
        // Split the pathname into segments based on '/'
        const segments = pathname.split('/');
        // Remove the last segment
        segments.pop();
        const profilePath = segments.join('/') + '/';
        return profilePath + riotIdGameName + '-' + riotIdTagline;
    }, [pathname, riotIdGameName, riotIdTagline]);

    return playerPath;
};

