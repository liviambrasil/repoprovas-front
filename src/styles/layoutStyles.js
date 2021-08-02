import styled from "styled-components"

const Title = styled.h1 `
    font-family: 'Raleway', sans-serif;
    font-size: 50px;
    font-weight: 400;
    margin-bottom: 40px;
`
const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    h2{
        font-family: 'Raleway', sans-serif;
        font-size: 30px;
        font-weight: 100;
        margin-bottom: 15px;
    }
    @media(max-width: 650px) {
        width: 90%;
        flex-direction: column;
    }
`
const Box = styled.div`
    width: 460px;
    display:flex;
    justify-content: space-evenly;

    @media(max-width: 650px) {
        height: 25vh;
        width: 90%;
        flex-direction: column;
    }
`

export { Title, Container, Box }