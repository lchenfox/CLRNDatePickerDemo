import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Pages
import DatePage from './DatePage';
import ScanScreen from './ScanScreen';

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="DatePage" component={DatePage} />
                    <Stack.Screen name="ScanScreen" component={ScanScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
