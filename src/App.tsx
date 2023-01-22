import React, {useState} from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import {configureThemes, useTheme} from '../module';
import {CreateColorsType, CreateThemesType} from '../module/types';

type ThemeKeys = 'light' | 'dark';
type ColorKeys = 'textColor' | 'background';
type Themes = CreateThemesType<ThemeKeys, ColorKeys>;
type Colors = CreateColorsType<Themes>;

configureThemes<Themes>(
  {
    light: {
      textColor: 'red',
      background: '#000',
    },
    dark: {
      textColor: 'green',
      background: '#000',
    },
  },
  'light',
);

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

const App = () => {
  const [theme, setTheme] = useState('red');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Button
        title="Toggle theme"
        onPress={() => {
          setTheme(theme === 'red' ? 'green' : 'red');
        }}
      />
      <ThemeText />
    </>
  );
};

const ThemeText = () => {
  const { styles, colors, theme } = useTheme<Themes, ReturnType<typeof styleCreator>>(styleCreator);

  console.log(theme);
  console.log(colors.textColor);

  return <Text style={styles.text}>Hello</Text>;
};

export default App;
