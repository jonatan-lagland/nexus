'use client'
import React from 'react';

type RegionContextProps = {
    region: string;
}

export const RegionContext = React.createContext<RegionContextProps>(undefined);