import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type CreateThemesType<TK extends string, CK extends string> = {
  [i in TK]: {
    [j in CK]: string;
  };
};

export type CreateColorsType<T extends string> = { [key in T]: string };

export type ThemeColors<T> = T[keyof T];

export type ThemesType<T> = { [K in keyof T]: ThemeColors<T> };

export type ThemeListener<T> = (theme: keyof T) => void;

export type StyleCreatorWithoutProps<T extends ThemesType<T>, S extends NamedStyles<S>> = (colors: T) => S;

export type StyleCreatorWithProps<T extends ThemesType<T>, S extends NamedStyles<S>, P> = (colors: T, props: P) => S;

export type StyleCreator<T extends ThemesType<T>, S extends NamedStyles<S>, P = never> = (colors: T, props?: P) => S;
