import styled from "styled-components";
import { useEffect, useState } from "react";
import { TextInput, SelectInput } from "../components/inputs";
import { Title, Container } from "../styles/layoutStyles";
import { getProfessorsBySubject, getSubject } from "../requests/getData";
import { MyButton } from "../components/button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function NewTest (){

    const [name, setName] = useState("")
    const [category, setCategory] = useState()
    const [subject, setSubject] = useState()
    const [professor, setProfessor] = useState()
    const [semester, setSemester] = useState()
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

    const semestersOptions = [
        {value: '1°', label: '1°'},
        {value: '2°', label: '2°'},
        {value: '3°', label: '3°'},
        {value: '4°', label: '4°'},
        {value: '5°', label: '5°'},
        {value: '6°', label: '6°'},
        {value: '7°', label: '7°'},
        {value: '8°', label: '8°'},
        {value: '9°', label: '9°'},
        {value: '10°', label: '10°'}
    ]

    if(!subjects.length) return <></>
    return(
            <Container>
                <Title>RepoProvas</Title>
                <Form autoComplete="on" onSubmit={(e) => {
                                            e.preventDefault()
                                            sendTest({name, category, subject, professor, history, link, semester})}}>
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
                    <SelectInput    label="Período"
                                    value={semester}
                                    onChange={(event) => setSemester(event.target.value)}
                                    variant="outlined"
                                    SelectProps={{native: true,}}
                                    options={semestersOptions} />
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
            
        )

}

function sendTest ({ name, category, subject, professor, history, link, semester }) {
    console.log('rodou!')
    const body = {name, category, subject, professor, link, semester}
    const promise = axios.post(`${process.env.REACT_APP_HOST}/new-test`, body)
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