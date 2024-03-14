"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react";
import AccessibilitySwitch from "@components/Profile/Header/AccessibilitySwitch";
import { useState } from "react";

const SettingsDialog = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Dialog onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="px-0 py-0 bg-transparent" aria-label="Settings">
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="button-hover-animation flex flex-row cursor-pointer gap-3">
                        <Settings className={`rotate-icon ${isHovered ? 'rotated' : ''} rounded-full px-0 ${isDialogOpen ? 'rotated' : ''}`} color="white" size={24} />
                        <label className="text-white hover:cursor-pointer font-normal text-sm hidden md:block">Settings</label>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-slate-500 bg-[#30343F]">
                <DialogHeader>
                    <DialogTitle className="text-white">Settings</DialogTitle>
                    <DialogDescription className=" text-neutral-400">
                        Customize your settings.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <AccessibilitySwitch></AccessibilitySwitch>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default SettingsDialog;