import styled from "styled-components";
import { useEffect, useState } from "react";
import { TextInput, SelectInput } from "../components/inputs";
import { Title, Container } from "../styles/layoutStyles";
import { getProfessorsBySubject, getSubject } from "../requests/getData";
import { MyButton } from "../components/button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Center } from "./home";

export default function NewTest (){

    const [name, setName] = useState("")
    const [category, setCategory] = useState()
    const [subject, setSubject] = useState()
    const [professor, setProfessor] = useState()
    const [subjects, setSubjects] = useState([])
    const [professors, setProfessors] = useState([])
    const [link, setLink] = useState("")
    const history = useHistory()

    useEffect(() => {
        getSubject(setSubjects)
    }, [category])

    const options = [
        {value: 'P1', label: 'P1'},
        {value: 'P2', label: 'P2'},
        {value: 'P3', label: 'P3'},
        {value: '2CH', label: '2CH'},
        {value: 'Outras', label: 'Outras'}
    ]


    if(!subjects.length) return <></>
    return(
        <Center>
            <Container>
                <Title>RepoProvas</Title>
                <Form autoComplete="on" onSubmit={(e) => {
                                            e.preventDefault()
                                            sendTest({name, category, subject, professor, history, link})}}>
                    <TextInput  required 
                                variant="outlined"
                                label="Nome"
                                onChange={(event) => setName(event.target.value)} />
                    <TextInput  required 
                                variant="outlined"
                                label="Link"
                                onChange={(event) => setLink(event.target.value)} />
                    <SelectInput    label="Categoria"
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    variant="outlined"
                                    SelectProps={{native: true,}}
                                    options={options} />
                    <SelectInput    label="Disciplina"
                                    value={subject}
                                    onChange={async(event) => {
                                        setSubject(event.target.value)
                                        getProfessorsBySubject({event, subject, setProfessors})}}
                                    variant="outlined"
                                    SelectProps={{native: true,}}
                                    options={subjects} />
                        {professors.length
                        ? <SelectInput    label="Professor"
                                        value={professor}
                                        onChange={(event) => setProfessor(event.target.value)}
                                        variant="outlined"
                                        SelectProps={{native: true,}}
                                        options={professors} />
                        : <> </>}
                    
                        <MyButton variant="contained" 
                                    color="primary" 
                                    size="large"
                                    startIcon={<CloudUploadIcon />}
                                    label="Salvar prova"
                                    type="submit" />
                    </Form>
                </Container>
            </Center>
            
        )

}

function sendTest ({ name, category, subject, professor, history, link }) {
    console.log('rodou!')
    const body = {name, category, subject, professor, link}
    const promise = axios.post(`${process.env.REACT_APP_HOST}new-test`, body)
    promise.then(() => {
        alert("Prova cadastrada!")
        history.push("/")})
}

const Form = styled.form`
    width: 460px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`