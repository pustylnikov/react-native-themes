import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Text, Button,
} from 'react-native';
import {setColorThemes, ThemeProvider, useThemeStyles} from '../module';

setColorThemes({
    red: {
        textColor: 'red',
    },
    green: {
        textColor: 'green',
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
    const styles = useThemeStyles(styleCreator);
    return <Text style={styles.text}>Hello</Text>;
};


const styleCreator = (colors: { [key: string]: string }) => StyleSheet.create({
    text: {
        color: colors.textColor,
    },
});

export default App;
