import React, { useMemo, useState, useEffect } from 'react'
import {Col, Grid, Row} from 'react-native-easy-grid';
import {getBoard} from '../../utilities/FileUtilities';
import _ from 'lodash'
import {Card, CardItem, Text, Body} from "native-base";
import {BOARD, RUBIK_BOLD} from "../../constants/constants";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import * as Speech from 'expo-speech'

import {SvgUri} from "react-native-svg";

const defaultBoard = {
  grid: {order: []},
};

const DEFAULT_BOARD_NAME = "board_1_235";

const Board = (props) => {
  let [board, setBoard] = useState(defaultBoard);
  let [boardName, setBoardName] = useState(DEFAULT_BOARD_NAME);

  const setupBoard = async () => {
    console.log("newBoard");
    const newBoard = await getBoard(boardName);
    setBoard(newBoard)
  };

  useEffect(() => {
    setupBoard(boardName)
  }, [boardName]);
  console.log(board);

  const buttons = useMemo(() => {
    let rows = [];
    board.grid.order.forEach((grid) => {
      let row = grid.map((item, innerIndex) => {
      if(!item) return
      let boardItem = _.find(board.buttons, {id: item});
      let image = _.find(board.images, {id: boardItem.image_id});

      console.log("image", image);
      console.log("boardItem", boardItem);

      return (

          <Card style={styles.card}>
            <TouchableOpacity onPress={() => {
              console.log("SPEAK");
              if(boardItem.load_board){
                setBoardName(`board_${boardItem.load_board.id}`)
              } else {
                Speech.speak(boardItem.label)
                if(boardName !== DEFAULT_BOARD_NAME){
                  setBoardName(defaultBoard)
                }
              }
            }}>
              <CardItem style={styles.cardTitle} >
                <Text style={styles.cardTitle}>{boardItem.label}</Text>
              </CardItem>
              <CardItem style={styles.cardBody}>
                <Body>
                  {image.url.endsWith('svg') ?
                    <SvgUri
                    width="90%"
                    height="90%"
                    uri={image.url}
                  /> :
                    <Image
                      style={styles.image}
                      source={{
                        uri: image.url
                      }}
                    />
                  }

                </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
        )
      });
      rows.push(<Row style={styles.row}>{row}</Row>)
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
    fontFamily: RUBIK_BOLD,
    backgroundColor: '#3D3E41'
  },
  card: {
    backgroundColor: '#38383B',
    width: '20%',
  },
  cardBody: {
    backgroundColor: '#38383B'
  },
  background: {
    backgroundColor: '#2B2D2F'
  },
  center: {
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    width: "90%", height: undefined, aspectRatio: 1.1
  },
  row: {
    // margin: 10
    marginBottom: 0
  }
});
