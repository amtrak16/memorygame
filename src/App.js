import React, { Component } from 'react';
import './App.css';

const sqrObj = {
  'selected': false, 
  'guessed': false
}

const genBoard = () => {
  const boardArr = []
  for (let i=0;i<12;i++){
    boardArr.push(sqrObj)
  }
  return boardArr
}

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phase: 'start',
      board: genBoard()
    }
    this.squareHandler = this.squareHandler.bind(this);
    this.renderSquare = this.renderSquare.bind(this);
    this.phaseHandler = this.phaseHandler.bind(this);
    this.selectPhase = this.selectPhase.bind(this);

  }

  phaseHandler () {
    let newState = ''
    switch(this.state.phase){
      case "start":
        newState = "select";
        break;
      case "select":
        newState = "display";
        this.selectPhase (this.state.board);
        break;
      case "display":
        newState = "guess";
        break;
      case "guess":
        newState = "again";
        break;
      case "again":
        newState = "select";
        break;
      default:
        console.log ('Invalid Phase')
    }
    this.setState({phase: newState})
  }

  selectPhase (props) {
    let arr = [];
    while (arr.length < 4) {
      let randomnumber = Math.ceil(Math.random() * 11)
      if (arr.indexOf(randomnumber) === -1) { arr.push(randomnumber) }
    }

    let newBoard = this.state.board.map (function (item, x) {
      if (arr.indexOf(x) !== -1) {
            // console.log('yes ' + x, arr);
            return {'selected': true,'guessed': item.guessed};
          }
          else { 
            // console.log('no '+ x, arr);
            return item; 
          }
    })
    this.setState({board:newBoard})
  }

  squareHandler(cellId) {
    let arr = this.state.board.map(item => {
      if (cellId === item.cellId) {
        return { 'cellId': item.cellId, 'disabled': true };
      }
      else { return item; }
    });

    this.setState({ board: arr });

  }

  renderSquare(i, selected, guessed) {
    let sqrStyle={backgroundColor:'grey'};
    selected ? sqrStyle = { backgroundColor: 'blue' } : sqrStyle = { backgroundColor: 'grey' };
    return (
      <button className="square" id={i} style={sqrStyle} onClick={() => {this.squareHandler(this.id); }}></button>
    )
  }

  render() {
    const startgame = {borderRadius: '5px'}

    return (
      <div className="container">
        <h1 id="title">Memory Game</h1>
          <div id="game-board">
            <div className="board-row">
              {this.renderSquare(0, this.state.board[0].selected, this.state.board[0].guessed)}
              {this.renderSquare(1, this.state.board[1].selected, this.state.board[1].guessed)}
              {this.renderSquare(2, this.state.board[2].selected, this.state.board[2].guessed)}
              {this.renderSquare(3, this.state.board[3].selected, this.state.board[3].guessed)} 
            </div>
            <div className="board-row">
              {this.renderSquare(4, this.state.board[4].selected, this.state.board[4].guessed)}
              {this.renderSquare(5, this.state.board[5].selected, this.state.board[5].guessed)}
              {this.renderSquare(6, this.state.board[6].selected, this.state.board[6].guessed)}
              {this.renderSquare(7, this.state.board[7].selected, this.state.board[7].guessed)}
            </div>
            <div className="board-row">
              {this.renderSquare(8, this.state.board[8].selected, this.state.board[8].guessed)}
              {this.renderSquare(9, this.state.board[9].selected, this.state.board[9].guessed)}
              {this.renderSquare(10, this.state.board[10].selected, this.state.board[10].guessed)}
              {this.renderSquare(11, this.state.board[11].selected, this.state.board[11].guessed)}
            </div>
          </div>
          <div id="game-phase">
          <button id='phase-btn' style={startgame} onClick={() => { this.phaseHandler(); }}>{this.state.phase}</button>
          </div>
      </div>
    )
  }
}

export default Game;
