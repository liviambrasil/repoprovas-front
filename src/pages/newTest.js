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

    const [name, setName] = useState()
    const [category, setCategory] = useState("Selecione a categoria")
    const [subject, setSubject] = useState("Selecione a disciplina")
    const [professor, setProfessor] = useState("Selecione o professor da disciplina")
    const [subjects, setSubjects] = useState([])
    const [professors, setProfessors] = useState([])
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

    return(
            <Container>
                <Title>RepoProvas</Title>
                <Form autoComplete="on" onSubmit={(e) => {
                                            e.preventDefault()
                                            sendTest({name, category, subject, professor, history})}}>
                    <TextInput  required 
                                variant="outlined"
                                label="Nome"
                                onChange={(event) => setName(event.target.value)} />
                    <SelectInput    label="Categoria"
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    variant="outlined"
                                    SelectProps={{native: true,}}
                                    options={options} />
                    <SelectInput    label="Disciplina"
                                    value={subjects.length ? subject : {value: "", label: ""}}
                                    onChange={async(event) => {
                                        setSubject(event.target.value)
                                        getProfessorsBySubject({event, subject, setProfessors})}}
                                    variant="outlined"
                                    SelectProps={{native: true,}}
                                    options={subjects} />
                    <SelectInput    label="Professor"
                                    value={professors.length ? professor : {value: "", label: ""}}
                                    onChange={(event) => setProfessor(event.target.value)}
                                    variant="outlined"
                                    SelectProps={{native: true,}}
                                    options={professors} />
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

function sendTest ({ name, category, subject, professor, history }) {
    const body = {name, category, subject, professor}
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