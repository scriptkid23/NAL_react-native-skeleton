import Styled from 'styled-components'

const Block = Styled.button`
  background : ${props => !props.value ? `#767c77` : `#fddb3a`};
  border : none;
  border-radius: 20%;
  width : 2.5rem;
  height : 2.5rem;
  margin : 5px;
`
const Container = Styled.div`
    display : flex;
`
export { Block,Container}