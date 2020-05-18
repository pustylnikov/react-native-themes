import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
} from 'react-native';

const App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView />
        </>
    );
};

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: '#fff',
    },
});

export default App;
