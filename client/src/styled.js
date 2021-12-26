import Styled from 'styled-components'

const Block = Styled.button`
  background : ${props => !props.value ? `#767c77` : `#fddb3a`};
  border : none;
  border-radius: 20%;
  width : 2.5rem;
  height : 2.5rem;
  margin: 0 0.5rem 1rem 0;
  
  
`
const Button = Styled.button`
  border-radius: 4px;
  background: none;
  border:2px solid rgb(171,69,255);
  width: 100px;
  height: 30px;
  cursor: pointer;
  color: white;
  transition: color .15s ease-in-out,
              background-color .15s ease-in-out,
              border-color .15s ease-in-out,
              box-shadow .15s ease-in-out;
  &:hover {
    background: rgb(171,69,255);
    border:none;
  }
`
const Container = Styled.div`
    display : flex;
`

export { Block, Container, Button }