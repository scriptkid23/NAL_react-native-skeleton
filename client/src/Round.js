import React from 'react';
import{Block,Container} from './styled'


export default (props) => {
    const [challenge,setChallenge] = React.useState(props.challenge)
    const n = challenge.length;
    const m = challenge[0].length;
    const handleBlock = (row,col) =>{
      challenge[row][col] = !challenge[row][col]
        if(row > 0 && row < n - 1&& col > 0 && col < m - 1){
            challenge[row][col - 1] = !challenge[row][col - 1]
            challenge[row][col + 1] = !challenge[row][col + 1]
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row - 1][col] = !challenge[row - 1][col]
        }
        if(row == 0  && col > 0 && col < m - 1){
            challenge[row][col - 1] = !challenge[row][col - 1]
            challenge[row][col + 1] = !challenge[row][col + 1]
            challenge[row + 1][col] = !challenge[row + 1][col]
        }
        if(row == n - 1  && col > 0 && col < m - 1){
            challenge[row][col - 1] = !challenge[row][col - 1]
            challenge[row][col + 1] = !challenge[row][col + 1]
            challenge[row - 1][col] = !challenge[row - 1][col]
        }
        if(col == 0 && row > 0 && row < n  - 1){
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col  + 1] = !challenge[row][col + 1]
        }
        if(col == m - 1 && row > 0 && row < n  - 1){
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col  - 1] = !challenge[row][col - 1]
        }
        if(col == m - 1 && row == n - 1){
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col - 1] = !challenge[row][col - 1]
        }
        if(col == 0 && row == 0){
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row][col + 1] = !challenge[row][col + 1]
        }
        if(col == 0 && row == n  - 1){
            challenge[row - 1][col] = !challenge[row - 1][col]
            challenge[row][col + 1] = !challenge[row][col + 1]
        }
        if(col == m - 1 && row == 0){
            challenge[row + 1][col] = !challenge[row + 1][col]
            challenge[row][col - 1] = !challenge[row][col - 1]
        }
        setChallenge([...challenge])
    }
    const generateBlock = (row, value) => {
     
        return value.map((state,col)=> {
            return(
                <Block key={col} value={state} onClick={()=>handleBlock(row,col)}/>
            )
        })
    }
    
    return(
       <div>
           {challenge.map((value,index)=>{
               return(
                   <Container key={index}>
                       {generateBlock(index,value)}
                   </Container>
               )
           })}
       </div>
    )

}