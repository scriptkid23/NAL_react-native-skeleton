import React from 'react';
import { Block, Container, Button } from './styled'
import Lottie from 'lottie-react-web'
import success from './success.json';
export default (props) => {
    const [challenge, setChallenge] = React.useState(props.challenge)
    const [flipped, setFlipped] = React.useState(false);
    const [win, setWin] = React.useState(false);
    const [result, setResult] = React.useState([]);
    const n = challenge.length;
    const m = challenge[0].length;
    const checkWin = () => {
        let flag = true;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (challenge[i][j] == 0) {
                    flag = false;
                }
            }
        }
        return flag;
    }
    function exportPoisition(row, col) {
        let n = 6, m = 5;
        let poisition = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {

                if (row === i && col === j) {
                    i = n + 1;
                    j = m + 1;
                }
                poisition++;

            }
        }
        return poisition;
    }
    const handleBlock = (row, col) => {
        setResult([...result, exportPoisition(row,col)])
        challenge[row][col] = !challenge[row][col]
        setFlipped(!flipped)
        if (row > 0 && row < n - 1 && col > 0 && col < m - 1) {
            challenge[row][col - 1] = !challenge[row][col - 1]
            challenge[row][col + 1] = !challenge[row][col + 1]
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row - 1][col] = !challenge[row - 1][col]
        }
        if (row === 0 && col > 0 && col < m - 1) {
            challenge[row][col - 1] = !challenge[row][col - 1]
            challenge[row][col + 1] = !challenge[row][col + 1]
            challenge[row + 1][col] = !challenge[row + 1][col]
        }
        if (row === n - 1 && col > 0 && col < m - 1) {
            challenge[row][col - 1] = !challenge[row][col - 1]
            challenge[row][col + 1] = !challenge[row][col + 1]
            challenge[row - 1][col] = !challenge[row - 1][col]
        }
        if (col === 0 && row > 0 && row < n - 1) {
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col + 1] = !challenge[row][col + 1]
        }
        if (col === m - 1 && row > 0 && row < n - 1) {
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col - 1] = !challenge[row][col - 1]
        }
        if (col === m - 1 && row === n - 1) {
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col - 1] = !challenge[row][col - 1]
        }
        if (col === 0 && row === 0) {
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row][col + 1] = !challenge[row][col + 1]
        }
        if (col === 0 && row === n - 1) {
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col + 1] = !challenge[row][col + 1]
        }
        if (col === m - 1 && row === 0) {
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row][col - 1] = !challenge[row][col - 1]
        }
        setChallenge([...challenge])
        props.countDown();

        if (checkWin() && props.countDownValue > 0) {
            setWin(true)
            props.setWin(true);
        }
    }
    const generateBlock = (row, value) => {

        return value.map((state, col) => {
            return (
                <Block
                    className="button"
                    key={col}
                    value={state}
                    onClick={() => handleBlock(row, col)}
                />
            )
        })
    }
    return (
        <div>
            {win ?
                <div>
                    <Lottie
                        options={{
                            animationData: success
                        }}
                        width={"70%"}
                    />
                    <p>Congratulations</p>
                    <Button>Get Card</Button>
                </div> : challenge.map((value, index) => {
                    return (
                        <Container key={index}>
                            {generateBlock(index, value)}
                        </Container>
                    )
                })}

        </div>
    )

}