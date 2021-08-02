
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyButton } from '../components/button';
import { Title, Container, Box } from "../styles/layoutStyles"

export default function Home () {

    return(
        <Center>
            <Container>
                <Title>RepoProvas</Title>
                <Box>
                    <Link to="/tests">
                        <MyButton variant="contained" 
                                color="primary" 
                                size="large"
                                label="Acessar provas"
                                type="button" />
                    </Link>
                    <Link to="/new-test">
                        <MyButton variant="contained" 
                                color="primary" 
                                size="large"
                                startIcon={<CloudUploadIcon />}
                                label="Enviar prova" 
                                type="button" />
                    </Link>
                </Box>
            </Container>
        </Center>
    )
}

export const Center = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
