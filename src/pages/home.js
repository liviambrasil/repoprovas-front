import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';
import { Title, Container, Box } from "../styles/layoutStyles"
import axios from 'axios';

export default function Home () {

    return(
        <Container>
            <Title>RepoProvas</Title>
            <Box>
                <Link to="/tests">
                    <Button variant="contained" 
                            color="primary" 
                            size="large">Acessar provas</Button>
                </Link>
                <Link to="/new-test">
                    <Button variant="contained" 
                            color="primary" 
                            size="large"
                            startIcon={<CloudUploadIcon />}>Enviar prova</Button>
                </Link>
            </Box>
        </Container>
    )
}
