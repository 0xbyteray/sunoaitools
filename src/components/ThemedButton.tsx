"use client";
import PhMoonFill from "@/components/icons/moon";
import PhSunBold from "@/components/icons/sun";
import { useState, useEffect } from 'react'
import { useTheme } from "next-themes";

export function ThemedButton() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <PhMoonFill /> : <PhSunBold />}
    </div>
  );
}
