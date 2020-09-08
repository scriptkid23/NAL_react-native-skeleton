import Styled from 'styled-components'

const Block = Styled.button`
  background : ${props => !props.value ? `#767c77` : `#ffd571`};
  border : none;
  border-radius: 20%;
  width : 50px;
  height : 50px;
  margin : 5px;
`
const Container = Styled.div`
    display : flex;
`
export { Block,Container}