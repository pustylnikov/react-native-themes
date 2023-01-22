import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type CreateThemesType<TK extends string, CK extends string> = { [k in TK]: { [j in CK]: string; } };

export type CreateColorsType<T extends Themes<any>> = T[keyof T];

export type Themes<T> = { [K in keyof T]: Colors<T> };

export type Colors<T> = T[keyof T];

export type Styles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type Theme<T extends Themes<any>, S extends Styles<S>> = {
  theme: keyof T;
  colors: Colors<T>;
  styles: S;
};

export type ThemeWithoutStyles<T extends Themes<any>> = {
  theme: keyof T;
  colors: Colors<T>;
};

export type ThemeListener<T extends Themes<any>> = (theme: keyof T) => void;

export type StyleCreator<T extends Themes<any>, S extends Styles<S>> = (colors: Colors<T>) => S;
