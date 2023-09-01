import {useEffect, useMemo, useState} from 'react';

import {
  SelectorSpecifics,
  StyleCreator,
  Styles,
  ThemeListener,
  Themes,
} from './types';
import {StyleSheet, useWindowDimensions} from 'react-native';

// Map to store all theme listeners
const $listeners = new Map<symbol, ThemeListener<Themes<any>>>();

// Variable to store all themes
let $themes: Themes<any>;

// Variable to store current theme
let $currentTheme: any;

// Function to set all themes
function $setThemes<T extends Themes<T>>(value: T): void {
  $themes = value;
}

// Function to set current theme
function $setCurrentTheme<T extends Themes<T>>(value: keyof T): void {
  $currentTheme = value;
}

// Function to create a theme selector
function $createThemeSelector<T extends Themes<T>>(theme: keyof T) {
  return <V extends any>(specifics: SelectorSpecifics<T, V>): V | undefined => {
    if (theme in specifics) {
      return specifics[theme];
    } else if ('default' in specifics) {
      return specifics.default;
    }
  };
}

// Function to get current theme
export function getTheme<T extends Themes<T>>(): keyof T {
  return $currentTheme as keyof T;
}

// Function to set current theme and call all listeners
export function setTheme<T extends Themes<T>>(theme: keyof T): void {
  if ($currentTheme !== theme) {
    $setCurrentTheme(theme);

    let count = 0;
    let total = 0;
    let batch: ThemeListener<Themes<T>>[] = [];
    $listeners.forEach((listener) => {
      batch.push(listener);
      ++count;
      ++total;
      if (count === 10 || total === $listeners.size) {
        const $batch = batch;
        setImmediate(() => {
          $batch.forEach(f => f(theme));
        });
        batch = [];
        count = 0;
      }
    });
  }
}

// Function to register a theme listener
export const registerListener = <T extends Themes<T>>(listener: ThemeListener<T>): (() => boolean) => {
  const key = Symbol();
  $listeners.set(key, listener);

  return () => $listeners.delete(key);
};

// Function to get colors for a specific theme
export function getColors<T extends Themes<T>>(theme?: keyof T): Readonly<T[keyof T]> {
  return $themes[theme || getTheme<T>()];
}

// Hook to use current theme and its colors
export function useTheme<T extends Themes<T>>() {
  const [themeState, setThemeState] = useState<keyof T>(getTheme<T>());

  useEffect(() => {
    const unsubscribe = registerListener((value: keyof T) => {
      setThemeState(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    theme: themeState,
    colors: getColors<T>(themeState),
  };
}

// Hook to use styles for current theme and its colors
export function useStyles<T extends Themes<T>, S extends Styles<any>>(
  creator: StyleCreator<T, S>,
) {
  const [themeState, setThemeState] = useState<keyof T>($currentTheme as keyof T);
  const dimensions = useWindowDimensions();

  useEffect(() => {
    const unsubscribe = registerListener((value: keyof T) => {
      setThemeState(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Memoize styles based on themeState
  const styles = useMemo(() => {
    return StyleSheet.create(creator({ colors: getColors(themeState), theme: themeState, select: $createThemeSelector<T>(themeState), dimensions }));
  }, [creator, themeState, dimensions]);

  return {
    styles,
    theme: themeState,
    colors: getColors<T>(themeState),
    dimensions,
  };
}

// Function to create a style configuration based on themes configuration and default theme
export const createStyles = <T extends Themes<T>, S extends Styles<any>>(
  creator: StyleCreator<T, S>,
) => () => useStyles<T, Styles<S>>(creator);

// Function to create all themes
export function createThemes<T extends Themes<T>>(themesConfiguration: T, defaultTheme: keyof T) {
  $setThemes(themesConfiguration);
  $setCurrentTheme(defaultTheme);

  return {
    useTheme: () => useTheme<T>(),
    useStyles: <S extends Styles<any>>(creator: StyleCreator<T, S>) => useStyles<T, S>(creator),
    createStyles: <S extends Styles<any>>(creator: StyleCreator<T, S>) => createStyles<T, S>(creator),
    setTheme: (theme: keyof T) => setTheme<T>(theme),
    getTheme: () => getTheme<T>(),
    getColors: (theme?: keyof T) => getColors<T>(theme),
    registerListener: (listener: ThemeListener<T>) => registerListener<T>(listener),
  };
}
