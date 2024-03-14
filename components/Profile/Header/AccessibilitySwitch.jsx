'use client'
import React from "react";
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { Switch } from "@components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function AccessibilitySwitch() {
    const { isColorblindMode, toggleColorblindMode } = useContext(ColorblindContext);
    return (
        <div className="grid grid-cols-2 items-center justify-center">
            <Label htmlFor="colorblind-mode" className="text-white">Colorblind Mode</Label>
            <Switch
                checked={isColorblindMode}
                onCheckedChange={toggleColorblindMode}
                id="colorblind-mode"></Switch>
        </div>
    )
}