'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useContext } from "react";
import { RegionContext } from "@utils/context/regionContext";

const DropdownComponent = () => {
    const { region, setRegion } = useContext(RegionContext)

    const handleSelect = (event) => {
        const selectedText = event.currentTarget.textContent;
        setRegion(selectedText);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-s-full border-zinc-700 border-e-0 text-gray-300">
                    <div className="flex flex-row items-center gap-1">
                        <span className="font-semibold">{region}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>NA</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>EUW</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>EUNE</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>OCE</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>KR</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>JP</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>BR</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>LAS</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>LAN</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>RU</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>TR</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>SG</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>PH</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>TW</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>VN</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSelect}>
                        <span>TH</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownComponent
