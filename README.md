### Installation
```
npm install --save @anvilapp/react-native-themes
```
or
```
yarn add @anvilapp/react-native-themes
```

### Usage example
```js
import { setColorThemes } from '@anvilapp/react-native-themes';

setColorThemes({
    light: {
        backgroundColor: '#fff',
        textColor: '#000',
    },
    dark: {
        backgroundColor: '#000',
        textColor: '#fff',
    },
});

// styles.js
import { StyleSheet } from 'react-native';
import { createStyle } from '@anvilapp/react-native-themes';

export default createStyle((colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    titleText: {
        color: colors.textColor,
    },
}));

// App.js
import React from 'react';
import { Text, View } from 'react-native';
import getStyles from './styles';

const App = () => {
    const styles = getStyles('light');

    return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Home Screen</Text>
        </View>
    );
};
```
