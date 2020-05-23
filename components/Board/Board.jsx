import React, { useMemo, useState, useEffect } from 'react'
import {Col, Grid, Row} from 'react-native-easy-grid';
import {getBoard} from '../../utilities/FileUtilities';
import _ from 'lodash'
import {Card, CardItem, Text} from "native-base";
import {BOARD, RUBIK_BOLD} from "../../constants/constants";
import {Image, StyleSheet} from "react-native";
import communikateImage from "../../assets/communikate.png";

const defaultBoard = {
  grid: {order: []},

}

const Board = (props) => {
  const [board, setBoard] = useState(defaultBoard);
  useEffect(async () => {
    const newBoard = await getBoard();
    setBoard(newBoard)
  }, []);
  console.log(board);
  console.log("HELLsO");

  const buttons = useMemo(() => {
    let rows = [];
    board.grid.order.forEach((grid) => {
      let row = grid.map((item) => {
        let boardItem = _.find(board.buttons, {id: item})
        return (
          <Col>
            <Card style={styles.card} borderRadius={10}>
              <CardItem style={styles.card} borderTopLeftRadius={10} borderTopRightRadius={10}>
                <Text style={styles.cardTitle}>{boardItem.label}</Text>
              </CardItem>
              {/*<CardItem button onPress={() => navigation.navigate(BOARD)} style={styles.card} borderBottomLeftRadius={10} borderBottomRightRadius={10}>*/}
              {/*  <Image source={communikateImage} style={{height: 175, width: 400, flex: 1}}/>*/}
              {/*</CardItem>*/}
            </Card>
          </Col>
        )
      });
      rows.push(<Row>{row}</Row>)
    });
    return rows;
  }, [board]);
  return (
    <Grid>
      {buttons}
    </Grid>
  )
};

export default Board;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D3E41',

  },
  title: {
    color: 'white',
    fontFamily: RUBIK_BOLD
  },
  cardTitle: {
    color: 'white',
    fontWeight: '500',
    fontFamily: RUBIK_BOLD
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
