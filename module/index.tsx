import React, {Context, useContext, useMemo, useCallback} from 'react';

/**
 * Declare types
 */
type Theme = { [key: string]: string }

type Themes = { [key: string]: Theme }

type StyleCreator = (colors: Theme, props?: any) => any

type ThemeProviderProps = {
    value: string,
    children: React.ReactNode,
}

/**
 * Declare variables
 */
let colors: Themes = {};
let ThemeContext: Context<string>;

/**
 * Set color themes
 */
export function setColorThemes(themes: Themes): void {
    colors = Object.freeze(themes);
}

/**
 * Return colors by theme
 */
export function getColorTheme(theme: string): Theme {
    return colors[theme];
}

/**
 * Create styles
 */
export function createStyle(styleCreator: StyleCreator) {
    return function (theme: string, props?: any) {
        return styleCreator(getColorTheme(theme), props);
    };
}

/**
 * Theme context creator
 */
function createContext(value: string): void {
    ThemeContext = React.createContext(value);
}

/**
 * Theme provider component
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children, value}) => {
    if (!ThemeContext) {
        createContext(value);
    }
    if (ThemeContext) {
        return (
            <ThemeContext.Provider value={value}>
                {children}
            </ThemeContext.Provider>
        );
    }
    return null;
};

/**
 * Hooks
 */

/**
 * Hook returns the name of current theme
 */
export function useTheme(): string {
    return useContext(ThemeContext);
}

/**
 * Hook returns the colors for current theme
 */
export function useThemeColors(): Theme {
    const theme = useContext(ThemeContext);
    return useMemo(() => getColorTheme(theme), [theme]);
}

/**
 * Hook returns styles
 */
export function useThemeStyles(styleCreator: StyleCreator, props?: any): any {
    const theme = useContext(ThemeContext);
    return useMemo(() => styleCreator(getColorTheme(theme), props), [theme, styleCreator, props]);
}

/**
 * Hook returns style creator
 */
export function useStyleCreator() {
    const theme = useContext(ThemeContext);
    return useCallback((styleCreator: StyleCreator, props?: any): any => (
        styleCreator(getColorTheme(theme), props)
    ), [theme]);
}
