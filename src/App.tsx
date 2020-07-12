import React, {useState} from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {
    Colors,
    CreateColorThemesType,
    setColorThemes,
    ThemeProvider,
    useTheme,
    useThemeColors,
    useThemeStyles,
} from '../module';

type ThemeKeys = 'light' | 'dark';
type ColorKeys = 'textColor';
type Themes = CreateColorThemesType<ThemeKeys, ColorKeys>;

setColorThemes<Themes>({
    light: {
        textColor: 'red',
    },
    dark: {
        textColor: 'green',
    },
});

const styleCreator = (colors: Colors<Themes>) => StyleSheet.create({
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
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView/>
            <Button
                title="Toggle theme"
                onPress={() => {
                    setTheme(theme === 'red' ? 'green' : 'red');
                }}
            />
            <ThemeProvider value={theme}>
                <ThemeText/>
            </ThemeProvider>
        </>
    );
};

const ThemeText = () => {
    const theme = useTheme<Themes>();
    const colors = useThemeColors<Themes>();
    const styles = useThemeStyles(styleCreator);

    console.log(theme);
    console.log(colors.textColor);
    console.log(styles.text);

    return <Text style={styles.text}>Hello</Text>;
};

export default App;
