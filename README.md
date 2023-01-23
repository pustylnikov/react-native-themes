# @anvilapp/react-native-themes
This package provides a set of utility functions for managing and consuming themes in a React Native application.
## Installation
```
npm install @anvilapp/react-native-themes
```
or
```
yarn add @anvilapp/react-native-themes
```
## Usage
First, you need to configure the available themes using the configureThemes function:
```tsx
import {configureThemes} from '@anvilapp/react-native-themes';

type ThemeKeys = 'light' | 'dark';
type ColorKeys = 'textColor' | 'background';
type Themes = CreateThemesType<ThemeKeys, ColorKeys>;

configureThemes<Themes>({
  light: {
    textColor: 'red',
    background: '#000',
  },
  dark: {
    textColor: 'green',
    background: '#000',
  },
}, 'light');
```
You can then use the useTheme hook to consume the current theme and create styles based on it:
```tsx
import {useTheme} from '@anvilapp/react-native-themes';
import {StyleSheet} from 'react-native';

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    text: {
      color: colors.textColor,
    },
    background: {
      textAlign: 'auto',
      color: colors.background,
    },
  });

const MyComponent = () => {
  const { styles, colors, theme } = useTheme<Themes, ReturnType<typeof styleCreator>>(styleCreator);

  return <Text style={styles.text}>Hello</Text>;
};
```
You can also use the setTheme function to change the current theme:
```tsx
import {setTheme} from '@anvilapp/react-native-themes';

setTheme('dark');
```
You can also use the addListener function to subscribe to theme changes:
```tsx
import {addListener} from '@anvilapp/react-native-themes';

const unsubscribe = addListener((theme) => {
  console.log('Theme changed:', theme);
});

// Unsubscribe when you're done
unsubscribe();
```
## API
- `configureThemes<T extends Themes<T>>(themes: T, defaultTheme: keyof T)`\
Configures the available themes.
- `setTheme<T extends Themes<T>>(theme: keyof T)`\
Sets the current theme.
- `getTheme<T extends Themes<T>>(): keyof T`\
Gets the current theme.
- `getColors<T extends Themes<T>>(theme?: keyof T): T[keyof T]`\
Gets the colors of a theme.
- `useTheme<T extends Themes<T>>(): ThemeWithoutStyles<T>`\
use hook to consume the current theme.
- `useTheme<T extends Themes<T>, S extends Styles<S>>(creator: StyleCreator<T, S>)`\
use hook to consume the current theme and create styles based on it.
- `addListener<T extends Themes<T>>(listener: ThemeListener<T>): (() => boolean)`\
Subscribe to theme changes.
## Types
- `CreateThemesType<TK extends string, CK extends string>`\
Create type for Themes
- `CreateColorsType<T extends Themes<any>>`\
Create type for Colors
- `Themes<T>`\
Create type for Themes
- `Colors<T>`\
Create type for Colors
- `Styles<T>`\
Create type for Styles
- `Theme<T extends Themes<any>, S extends Styles<S>>`\
Create type for Theme
- `ThemeWithoutStyles<T extends Themes<any>>`\
Create type for Theme without styles
- `ThemeListener<T extends Themes<any>>`\
Create type for ThemeListener
- `StyleCreator<T extends Themes<any>, S extends Styles<S>>`\
Create type for StyleCreator
