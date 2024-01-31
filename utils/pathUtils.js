'use client'
import path from '@data/imgPath.json';
import { useMemo } from 'react';
import { useContext } from 'react';
import { GameVersionContext } from './context/gameVersionContext';
import { ChampionListContext } from './context/championListContext';

const baseUrl = "https://ddragon.leagueoflegends.com/cdn";
const profileIcon = "img/profileicon";
const itemIcon = "img/item"
const championIcon = "img/champion"
const placeholderIconSrc = "/assets/images/placeholder.webp"

export const useImagePathChampion = (championName) => {
    const gamePatch = useContext(GameVersionContext);
    const championList = useContext(ChampionListContext);

    return useMemo(() => {
        if (!championName || !gamePatch || !championList.data) {
            return placeholderIconSrc;
        }

        const championData = championList.data[championName];
        if (!championData) {
            return placeholderIconSrc;
        }
        return `${baseUrl}/${gamePatch}/${championIcon}/${championData.image.full}`;
    }, [championName, gamePatch, championList.data]);
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
    const gamePatch = useContext(GameVersionContext);
    if (!info || !gamePatch) {
        return placeholderIconSrc
    }
    const id = info.profileIconId;
    const src = `${baseUrl}/${gamePatch}/${profileIcon}/${id}.png`;
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

