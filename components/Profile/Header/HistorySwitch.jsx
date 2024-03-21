'use client'
import React from "react";
import { useContext } from "react";
import { SettingsContext } from "@utils/context/settingsContext";
import { Switch } from "@components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function HistorySwitch() {
    const { isAllowHistory, toggleHistory } = useContext(SettingsContext);

    return (
        <div className="grid grid-cols-2 items-center border border-neutral-600 rounded-lg p-2">
            <div className="flex flex-col">
                <Label htmlFor="history-toggle" className="text-white">Enable search history tracking</Label>
                <Label htmlFor="history-toggle" className="text-neutral-400 text-xs">No data will be saved on the server</Label>
            </div>
            <div className="flex flex-row justify-center">
                <Switch
                    checked={isAllowHistory}
                    onCheckedChange={toggleHistory}
                    id="colorblind-mode"></Switch>
            </div>
        </div>
    )
}