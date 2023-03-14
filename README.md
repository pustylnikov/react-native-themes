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

To start using the package, first define your set of themes and their respective colors. This is done using the `CreateThemesType` type from the package:
```tsx
import { CreateThemesType } from '@anvilapp/react-native-themes/types';

type ThemeKeys = 'light' | 'dark';
type ColorKeys = 'textColor' | 'backgroundColor';
type Themes = CreateThemesType<ThemeKeys, ColorKeys>;

const themes: Themes = {
    light: {
        textColor: '#000',
        backgroundColor: '#fff',
    },
    dark: {
        textColor: '#fff',
        backgroundColor: '#000',
    },
};
```

Once you have defined your set of themes and colors, you can create a set of utility functions for managing and consuming themes using the `createThemes` function:
```tsx
import { createThemes } from '@anvilapp/react-native-themes';

const {
    useTheme,
    createStyles,
    useStyles, 
    setTheme,
    getTheme,
    getColors, 
    registerListener,
} = createThemes(themes, 'light');
```

You can then use these utility functions throughout your application to manage and consume themes.
For example, you can create styles that depend on the currently active theme using the `createStyles` function:
```tsx
const useStyles = createStyles(({ colors }) => ({
  text: {
    color: colors.textColor,
  },
  background: {
    textAlign: 'auto',
    color: colors.backgroundColor,
  },
}));

const MyComponent = () => {
  const { styles, colors, theme } = useStyles();

  return <Text style={styles.text}>Hello</Text>;
};
```

The following example demonstrates how you can pass props to a `StyleCreator` function to create dynamic styles based on component props.
This allows you to create highly reusable components that can be styled in a wide variety of ways, depending on the props that are passed in.

In this example, we define a function called `createStylesWithProps` that takes a `size` prop and returns a `StyleCreator` function that creates styles based on the current theme and color scheme. The `size` prop is used to set the font size of the text style.

In the `MyComponent` component, we use the `useMemo` hook to create the `StyleCreator` function with the current `size` prop value. We then use the `useStyles` hook to create a set of styles based on the `StyleCreator` function. Finally, we use the `styles` object returned by `useStyles` to style our `View` and `Text` components.
```tsx
const createStylesWithProps = (size: number) => createStyles(({ colors }) => ({
  text: {
    color: colors.textColor,
    fontSize: size,
  },
  container: {
    textAlign: 'auto',
    color: colors.backgroundColor,
  },
}));

const MyComponent = ({ size }) => {
  const useStyles = useMemo(() => createStylesWithProps(size), [size]);
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
    </View>
  );
};
```

Use the `useTheme` hook in a component
```tsx
const MyComponent = () => {
  const { theme, colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.backgroundColor }}>
      <Text style={{ color: colors.textColor }}>Hello, world!</Text>
    </View>
  );
};
```

Use the `useStyles` hook to create a set of styles
```tsx
const MyComponent = () => {
  const { styles, colors, theme } = useStyles(({ colors }) => ({
      container: {
          backgroundColor: colors.backgroundColor,
          padding: 20,
      },
      text: {
          color: colors.textColor,
          fontSize: 18,
      },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
    </View>
  );
};
```

Use the `setTheme` function to change the current theme
```tsx
setTheme('dark');
```

Use the `getTheme` function to get the current theme name
```tsx
const currentTheme = getTheme();
```

Use the `getColors` function to get the color scheme for a specific theme
```tsx
const lightColors = getColors('light');
```

se the `registerListener` function to be notified when the theme changes
```tsx
const unregisterListener = registerListener((newTheme) => {
  console.log(`Theme changed to ${newTheme}`);
});

// When you're done with the listener, unregister it
unregisterListener();
```

## API

### Types
This package exports several TypeScript types:
- `Themes<T>`: An object that maps theme names to their respective color schemes.
- `Colors<T>`: A type alias for the values of a Themes<T> object.
- `Styles<T>`: An object that maps style names to their respective ViewStyle, TextStyle, or ImageStyle.
- `ThemeListener<T>`: A function that is called whenever the current theme changes.
- `StyleCreatorProps<T>`: An object that contains the current theme and color scheme, as well as a function for selecting specific values from the theme.
- `StyleCreator<T, S>`: A function that takes a StyleCreatorProps<T> object and returns a set of styles.
- `SelectorSpecifics<T, V>`: An object that specifies specific values to use for a given theme, or a default value to use if no specific value is provided.
- `Selector<T>`: A function that takes a SelectorSpecifics<T, V> object and returns the specified value for the current theme, or the default value if no specific value is provided.
- `CreateThemesType<TK, CK>`: An object that maps theme names to objects containing color names and their respective values.
- `CreateColorsType<T>`: A type alias for the values of a Themes<T> object.

### Functions
This package exports several functions:
- `getTheme<T>(): keyof T`: Returns the current theme name.
- `setTheme<T>(theme: keyof T)`: void: Sets the current theme to the specified value.
- `registerListener<T>(listener: ThemeListener<T>): (() => boolean)`: Registers a function to be called whenever the current theme changes. Returns a function that can be called to unregister the listener.
- `getColors<T>(theme?: keyof T): Readonly<T[keyof T]>`: Returns the color scheme for the specified theme, or the current theme if no theme is specified.
- `useTheme<T>(): { theme: keyof T; colors: Readonly<T[keyof T]> }`: Returns an object containing the current theme and color scheme.
- `useStyles<T, S extends Styles<any>>(creator: StyleCreator<T, S>): { styles: Readonly<S>; theme: keyof T; colors: Readonly<T[keyof T]> }`: Returns a set of styles created using the specified StyleCreator function.
- `createStyles<T, S extends Styles<any>>(creator: StyleCreator<T, S>): () => { styles: Readonly<S>; theme: keyof T; colors: Readonly<T[keyof T]> }`: Returns a function that can be called to create a set of styles using the specified StyleCreator function.
- `createThemes<T>(themesConfiguration: T, defaultTheme: keyof T): { useTheme: () => { theme: keyof T; colors: Readonly<T[keyof T]> }; useStyles: <S extends Styles<any>>(creator: StyleCreator<T, S>) => { styles: Readonly<S>; theme: keyof T; colors: Readonly<T[keyof T]> }; createStyles: <S extends Styles<any>>(creator: StyleCreator<T, S>) => () => { styles: Readonly<S>; theme: keyof T; colors: Readonly<T[keyof T]> }; setTheme: (theme: keyof T) => void; getTheme: () => keyof T; getColors: (theme?: keyof T) => Readonly<T[keyof T]>; registerListener: (listener: ThemeListener<T>) => (() => boolean); }`\
  Initializes the package with the specified themes and default theme, and returns an object that provides several functions for working with themes and styles:
  - `useTheme()`: A function that returns an object containing the current theme name and color scheme.
  - `useStyles<S extends Styles<any>>(creator: StyleCreator<T, S>)`: A function that returns a set of styles created using the specified StyleCreator function.
  - `createStyles<S extends Styles<any>>(creator: StyleCreator<T, S>)`: A function that returns a function that can be called to create a set of styles using the specified StyleCreator function.
  - `setTheme(theme: keyof T)`: A function that sets the current theme to the specified value.
  - `getTheme()`: A function that returns the current theme name.
  - `getColors(theme?: keyof T)`: A function that returns the color scheme for the specified theme, or the current theme if no theme is specified.
  - `registerListener(listener: ThemeListener<T>)`: A function that registers a listener to be called whenever the current theme changes. Returns a function that can be called to unregister the listener.
