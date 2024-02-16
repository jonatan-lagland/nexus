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
                <Button aria-label="Settings" variant="link">
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="button-hover-animation flex flex-row cursor-pointer gap-3">
                        <Settings className={`rotate-icon ${isHovered ? 'rotated' : ''} rounded-full px-0 ${isDialogOpen ? 'rotated' : ''}`} color="white" size={24} />
                        <span className="text-white font-bold hidden md:block">Settings</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Customize your settings.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center">
                        <span>Colorblind Mode</span>
                        <AccessibilitySwitch></AccessibilitySwitch>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default SettingsDialog;