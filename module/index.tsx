import React, {Context, useContext, useMemo} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

/**
 * Declare types
 */
export type CreateColorThemesType<TK extends string, CK extends string> = {
    [key in TK]: {
        [key in CK]: string
    }
}

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type Colors<T> = T[keyof T]

export type ColorThemes<T> = { [K in keyof T]: Colors<T> }

export type StyleCreatorWithoutProps<T extends ColorThemes<T>, S extends NamedStyles<S>> = (colors: Colors<T>) => S
export type StyleCreatorWithProps<T extends ColorThemes<T>, S extends NamedStyles<S>, P> = (colors: Colors<T>, props: P) => S
export type StyleCreator<T extends ColorThemes<T>, S extends NamedStyles<S>, P = never> = (colors: Colors<T>, props?: P) => S

type ThemeProviderProps = {
    value: string,
    children: React.ReactNode,
}

/**
 * Declare variables
 */
let colors = {};
let ThemeContext: Context<any>;

/**
 * Set color themes
 */
export function setColorThemes<T extends ColorThemes<T>>(themes: T): void {
    colors = themes;
}

/**
 * Return colors by theme
 */
export function getColorTheme<T extends ColorThemes<T>>(theme: keyof T): T[keyof T] {
    return (colors as T)[theme];
}

/**
 * Create styles
 */
export function createStyle<T extends ColorThemes<T>, S extends NamedStyles<S>>(styleCreator: StyleCreatorWithoutProps<T, S>): S
export function createStyle<T extends ColorThemes<T>, S extends NamedStyles<S>, P>(styleCreator: StyleCreatorWithProps<T, S, P>): S
export function createStyle<T extends ColorThemes<T>, S extends NamedStyles<S>, P = never>(styleCreator: StyleCreator<T, S, P>) {
    return function (theme: keyof T, props?: P) {
        return styleCreator(getColorTheme<T>(theme), props);
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
 * Hook returns the name of current theme
 */
export function useTheme<T extends ColorThemes<T>>(): keyof T {
    return useContext<keyof T>(ThemeContext);
}

/**
 * Hook returns the colors for current theme
 */
export function useThemeColors<T extends ColorThemes<T>>(): Colors<T> {
    const theme = useContext<keyof T>(ThemeContext);
    return useMemo(() => getColorTheme<T>(theme), [theme]);
}

/**
 * Hook returns styles
 */
export function useThemeStyles<T extends ColorThemes<T>, S extends NamedStyles<S>>(styleCreator: StyleCreatorWithoutProps<T, S>): S
export function useThemeStyles<T extends ColorThemes<T>, S extends NamedStyles<S>, P>(styleCreator: StyleCreatorWithProps<T, S, P>, props: P): S
export function useThemeStyles<T extends ColorThemes<T>, S extends NamedStyles<S>, P = never>(styleCreator: StyleCreator<T, S, P>, props?: P) {
    const theme = useContext<keyof T>(ThemeContext);
    return useMemo(() => styleCreator(getColorTheme<T>(theme), props), [theme, styleCreator, props]);
}
