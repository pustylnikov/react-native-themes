import React from 'react';
import { Button, SafeAreaView, StatusBar, Text } from 'react-native';
import {createThemes} from '../module';
import {CreateThemesType} from '../module/types';

type ThemeKeys = 'light' | 'dark';
type ColorKeys = 'textColor' | 'backgroundColor';
type Themes = CreateThemesType<ThemeKeys, ColorKeys>;

const themes: Themes = {
  light: {
    textColor: 'red',
    backgroundColor: '#000',
  },
  dark: {
    textColor: 'green',
    backgroundColor: '#000',
  },
};

const { createStyles, setTheme, useTheme } = createThemes<Themes>(
  themes,
  'light',
);

const useStyles = createStyles(({ colors }) => ({
  text: {
    color: colors.textColor,
  },
  container: {
    textAlign: 'auto',
    color: colors.backgroundColor,
  },
}));

const App = () => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Button
        title="Toggle theme"
        onPress={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
      />
      <ThemeText />
    </>
  );
};

const ThemeText = () => {
  const { styles, colors, theme } = useStyles();
  styles.text = {};
  console.log(theme);
  console.log(colors.textColor);
  console.log(colors.backgroundColor);

  return <Text style={styles.text}>Hello</Text>;
};

export default App;
