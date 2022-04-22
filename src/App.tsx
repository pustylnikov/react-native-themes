import React, { useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { configureThemes, useColors, useStyle, useTheme } from '../module';
import { CreateColorsType, CreateThemesType } from '../module/types';

type ThemeKeys = 'light' | 'dark';
type ColorKeys = 'textColor';
type Themes = CreateThemesType<ThemeKeys, ColorKeys>;
type ColorsType = CreateColorsType<ColorKeys>;

configureThemes<Themes>(
  {
    light: {
      textColor: 'red',
    },
    dark: {
      textColor: 'green',
    },
  },
  'light',
);

const styleCreator = (colors: ColorsType) =>
  StyleSheet.create({
    text: {
      color: colors.textColor,
    },
    background: {
      textAlign: 'auto',
      color: colors.textColor,
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
  const theme = useTheme<Themes>();
  const colors = useColors<Themes>();
  const styles = useStyle(styleCreator);

  console.log(theme);
  console.log(colors.textColor);
  console.log(styles.text);

  return <Text style={styles.text}>Hello</Text>;
};

export default App;
