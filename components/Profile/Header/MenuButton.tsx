'use client'
import React from 'react'
import { Menu } from 'lucide-react'
import { SettingsContext } from '@utils/context/settingsContext'
import { useContext } from 'react';
import { Button } from '@components/ui/button';

function MenuButton() {

    const { toggleCollapseMenu } = useContext(SettingsContext);

    return (
        <Button className='button-hover-animation' variant={'link'} onClick={toggleCollapseMenu}>
            <Menu color="#ffffff" />
        </Button>
    )
}

export default MenuButton