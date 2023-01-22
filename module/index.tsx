import {useEffect, useMemo, useState} from 'react';

import {StyleCreator, Styles, Theme, ThemeListener, Themes, ThemeWithoutStyles} from './types';

const $listeners = new Map<symbol, ThemeListener<Themes<any>>>();

let $themes: Themes<any>;

let $currentTheme: keyof Themes<any>;

export const addListener = <T extends Themes<T>>(listener: ThemeListener<T>): (() => boolean) => {
  const key = Symbol();
  $listeners.set(key, listener);

  return () => $listeners.delete(key);
};

export function configureThemes<T extends Themes<T>>(themesConfiguration: T, defaultTheme: keyof T) {
  $themes = themesConfiguration;
  $currentTheme = defaultTheme;
}

export function setTheme<T extends Themes<T>>(theme: keyof T): void {
  if ($currentTheme !== theme) {
    $currentTheme = theme;
    $listeners.forEach(listener => {
      listener(theme);
    });
  }
}

export function getTheme<T extends Themes<T>>(): keyof T {
  return $currentTheme as keyof T;
}

export function getColors<T extends Themes<T>>(theme?: keyof T): T[keyof T] {
  return $themes[theme || $currentTheme];
}

export function useTheme<T extends Themes<T>>(): ThemeWithoutStyles<T>;

export function useTheme<T extends Themes<T>, S extends Styles<S>>(
    creator: StyleCreator<T, S>
): Theme<T, S>;

export function useTheme<T extends Themes<T>, S extends Styles<S>>(
  creator?: StyleCreator<T, S>,
): Theme<T, S> | ThemeWithoutStyles<T> {
  const [themeState, setThemeState] = useState<keyof T>($currentTheme as keyof T);

  useEffect(() => {
    const unsubscribe = addListener((value: keyof T) => {
      setThemeState(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const styles = useMemo(() => creator ? creator($themes[themeState]) : null, [creator, themeState]);

  if (styles) {
    return {
      theme: themeState,
      colors: $themes[themeState],
      styles,
    };
  }

  return {
    theme: themeState,
    colors: $themes[themeState],
  };
}
