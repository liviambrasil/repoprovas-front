import { Link } from "react-router-dom";
import { MyButton } from "../components/button";
import { Box, Container, Title } from "../styles/layoutStyles";
import { Center } from "./home";

export default function Tests (){
    return(
        <Center>
            <Container>
                <Title>RepoProvas</Title>
                <h2>Filtrar por:</h2>
                <Box>
                    <Link to="/tests/professors">
                        <MyButton variant="contained" 
                                color="primary" 
                                size="large"
                                label="Professor"
                                type="button" />
                    </Link>
                    <Link to="/tests/subjects">
                        <MyButton variant="contained" 
                                color="primary" 
                                size="large"
                                label="Disciplina" 
                                type="button" />
                    </Link>
                </Box>
            </Container>
        </Center>
    )
}