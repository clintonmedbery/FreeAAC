import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainMenu from './components/MainMenu'
import * as Font from 'expo-font'
import Board from './components/Board/Board'
import { BOARD, MAIN_MENU } from './constants/constants'
import { Container, Content, Spinner } from 'native-base'

const Stack = createStackNavigator()

const App = () => {
  const [loaded, setLoaded] = useState(false)
  console.log(loaded)
  const loadFonts = async () => {
    console.log('Loading Font')

    await Font.loadAsync({
      'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf')
    })
    console.log('Font Loaded')

    setLoaded(true)
  }

  useEffect(() => {
    loadFonts()
  }, [])

  return loaded ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name={MAIN_MENU} component={MainMenu} />
        <Stack.Screen name={BOARD} component={Board} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <Container>
      <Content>
        <Spinner />
      </Content>
    </Container>
  )
}

export default App
