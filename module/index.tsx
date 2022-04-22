import { useEffect, useMemo, useState } from 'react';

import {
  NamedStyles,
  StyleCreator,
  StyleCreatorWithoutProps,
  StyleCreatorWithProps,
  ThemeListener,
  ThemesType,
} from './types';

const _listeners = new Map();

let _themes: ThemesType<any>;

let _currentTheme: any;

export const addListener = <T extends ThemesType<T>>(listener: ThemeListener<T>): (() => boolean) => {
  const key = Symbol();
  _listeners.set(key, listener);

  return () => _listeners.delete(key);
};

export function configureThemes<T extends ThemesType<T>>(themesConfiguration: T, defaultTheme: keyof T) {
  _themes = themesConfiguration;
  _currentTheme = defaultTheme;
}

export function setTheme<T extends ThemesType<T>>(theme: keyof T): void {
  _currentTheme = theme;
  _listeners.forEach(listener => {
    listener(theme);
  });
}

export function useStyle<T extends ThemesType<T>, S extends NamedStyles<S>>(creator: StyleCreatorWithoutProps<T, S>): S;

export function useStyle<T extends ThemesType<T>, S extends NamedStyles<S>, P>(
  creator: StyleCreatorWithProps<T, S, P>,
  props: P,
): S;

export function useStyle<T extends ThemesType<T>, S extends NamedStyles<S>, P>(
  creator: StyleCreator<T, S, P>,
  props?: P,
): S {
  const [_theme, _setTheme] = useState<keyof T>(_currentTheme);

  useEffect(() => {
    const unsubscribe = addListener(value => {
      _setTheme(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return useMemo(() => creator(_themes[_theme], props), [creator, _theme, props]);
}

export function useColors<T extends ThemesType<T>>(): T[keyof T] {
  const [_theme, _setTheme] = useState<keyof T>(_currentTheme);

  useEffect(() => {
    const unsubscribe = addListener(value => {
      _setTheme(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return useMemo(() => _themes[_theme], [_theme]);
}

export function useTheme<T extends ThemesType<T>>(): keyof T {
  const [_theme, _setTheme] = useState<keyof T>(_currentTheme);

  useEffect(() => {
    const unsubscribe = addListener((value: keyof T) => {
      _setTheme(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return useMemo(() => _theme, [_theme]);
}

export function getTheme<T extends ThemesType<T>>(): keyof T {
  return _currentTheme;
}

export function getColors<T extends ThemesType<T>>(): T[keyof T] {
  return _themes[_currentTheme];
}
