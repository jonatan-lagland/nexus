'use client'
import React from "react";
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";

export default function AccessibilitySwitch() {
    const { isColorblindMode, toggleColorblindMode } = useContext(ColorblindContext);
    return (
        <label label="Accessibility Switch" className="switch">
            <input
                aria-label="Accessibility Switch"
                type="checkbox"
                checked={isColorblindMode}
                onChange={toggleColorblindMode}>
            </input>
            <span className="slider round"></span>
        </label>
    )
}