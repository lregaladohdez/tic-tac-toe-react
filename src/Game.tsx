import React from "react";
import Board from "./Board";

export default class Game extends React.Component<{}, {
    history: { squares: (string | null)[] }[],step:number}>{ 
    constructor(props: {}) {
        super(props)
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            step: 0
        }
    }
    render(): React.ReactNode {
        const {squares} = this.state.history[this.state.history.length - 1]
        const winner = this.calculateWinner(squares)
        const turn = this.state.step % 2 === 0 ? 'X' : 'O' 
        
        const moves = this.state.history.map((step, move) => { 
            const desc = move === 0
                ? `Go to game start`
                : `Go to move #${move}`
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
                
        })

        const status = winner
            ? `Winner player: ${winner}`
            : `Next player: ${turn}`;
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares}
                        turn={turn}
                        winner={winner}
                    onClick={(i) => this.handleClick(i)}    
                   ></Board>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{ moves}</ol>
                </div>
            </div>
        )
    }
    handleRestart(): void { 
        this.setState({
            history: [this.state.history[0]],
            step: 0
        })
    }
    handleClick(i: number): void {
        console.log(i,this)
        const current = this.state.history[this.state.history.length - 1]
        const winner = this.calculateWinner(current.squares)
        if (current.squares[i] || winner) {
            return
        }
        const newSquares = [...current.squares]
        newSquares[i] = this.state.step % 2 === 0 ? 'X' : 'O' 

        this.setState({
            history: [...this.state.history, { squares: newSquares }],
            step: this.state.step + 1
        })
    }
    jumpTo(i: number): void { 
        this.setState({
            history: this.state.history.slice(0, i+1),
            step: i
        })
    }
    calculateWinner(squares: (string | null)[]): (string | null) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        
    if (lines.some(line => line.every(i => squares[i] === 'X'))) {
       return 'X'
    } else if (lines.some(line => line.every(i => squares[i] === 'O'))) {
        return 'Y'
    }
        return null;
  }
}