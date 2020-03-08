import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from "./components/MainMenu";
import * as Font from 'expo-font';

const Stack = createStackNavigator();



const App = () => {
  const [loaded, setLoaded] = useState(false)
  const loadFonts = async () => {
    await Font.loadAsync({
      'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf'),
    });
    setLoaded(true)
  };

  useEffect(()=>{
    loadFonts()
  }, []);

  return (
    loaded &&
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="MainMenu" component={MainMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
