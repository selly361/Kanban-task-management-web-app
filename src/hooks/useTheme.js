import React , { useEffect, useState } from 'react'

export const useTheme = () => {

    const preferedTheme = (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
    
    const defaultTheme = localStorage.getItem("theme") || preferedTheme
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])
    

    return [theme, setTheme]
}