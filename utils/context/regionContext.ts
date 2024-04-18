'use client'
import React from 'react';

type RegionContextProps = {
    region: string;
    setRegion: (region: string) => void;
}

export const RegionContext = React.createContext<RegionContextProps>({
    region: 'NA',
    setRegion: () => { }
});