import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type Themes<T> = { [K in keyof T]: Colors<T> };

export type Colors<T> = T[keyof T];

export type Styles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type ThemeListener<T extends Themes<any>> = (theme: keyof T) => void;

export type StyleCreatorProps<T> = {
  colors: Readonly<Colors<T>>;
  theme: keyof T;
  select: Selector<T>;
};
export type StyleCreator<T extends Themes<any>, S extends Styles<S>> = (props: StyleCreatorProps<T>) => Readonly<S>;

export type SelectorSpecifics<T extends Themes<any>, V> = Partial<{ [K in keyof T]: V }> & { default: V } | { [K in keyof T]: V };

export type Selector<T extends Themes<any>> = <V>(specifics: SelectorSpecifics<T, V>) => V | undefined;

export type CreateThemesType<TK extends string, CK extends string> = Readonly<{ [k in TK]: Readonly<{ [j in CK]: string; }> }>;

export type CreateColorsType<T extends Themes<any>> = Readonly<T[keyof T]>;
