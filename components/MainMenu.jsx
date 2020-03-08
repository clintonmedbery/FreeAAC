import React, {useEffect}from 'react';
import { StyleSheet, View } from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Image} from 'react-native'
import { Container, Header, Title, Card, CardItem, Body, Text } from 'native-base';
import communikateImage from '../assets/communikate.png'
import * as Font from 'expo-font';

const MainMenu = () => {

  return (
    <Container>
      <Grid>
        <Header style={styles.container}>
          <Body>
            <Title style={styles.title}>Please Choose a Board</Title>
          </Body>
        </Header>

        <Row size={5} style={styles.background}>
          <Col></Col>
          <Col style={styles.center}>
            <Card style={styles.card} borderRadius={10}>
              <CardItem style={styles.card} borderTopLeftRadius={10} borderTopRightRadius={10}>
                <Text style={styles.cardTitle}>CommuniKate 2.0</Text>
              </CardItem>
              <CardItem button onPress={() => console.log("Hello World")} style={styles.card} borderBottomLeftRadius={10} borderBottomRightRadius={10}>
                <Image source={communikateImage} style={{height: 175, width: 400, flex: 1}}/>
              </CardItem>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Grid>
    </Container>
  );
}

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D3E41',

  },
  title: {
    color: 'white',
    fontFamily: 'rubik-bold'
  },
  cardTitle: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'rubik-bold'
  },
  card: {
    backgroundColor: '#38383B'
  },
  background: {
    backgroundColor: '#2B2D2F'
  },
  center: {
    justifyContent: 'center'
  }
});
