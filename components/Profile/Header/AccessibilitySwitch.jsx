'use client'
import React from "react";
import { useContext } from "react";
import { SettingsContext } from "@utils/context/settingsContext";
import { Switch } from "@components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function AccessibilitySwitch() {
    const { isColorblindMode, toggleColorblindMode } = useContext(SettingsContext);
    return (
        <div className="grid grid-cols-2 items-center border border-neutral-600 rounded-lg p-2">
            <Label htmlFor="colorblind-mode" className="text-white">Colorblind Mode</Label>
            <div className="flex flex-row justify-center">
                <Switch
                    checked={isColorblindMode}
                    onCheckedChange={toggleColorblindMode}
                    id="colorblind-mode"></Switch>
            </div>
        </div>
    )
}