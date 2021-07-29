import styled from "styled-components"

const Title = styled.h1 `
    font-family: 'Raleway', sans-serif;
    font-size: 50px;
    font-weight: 400;
    margin-bottom: 40px;
`
const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Box = styled.div`
    width: 50%;
    display:flex;
    justify-content: space-evenly;

    @media(max-width: 510px) {
        height: 25vh;
        flex-direction: column;
    }
`

export { Title, Container, Box }