import axios from "axios";

async function getSubject (setSubjects) {
    const subjectsOptions = []
    try{
        const response = await axios.get(`${process.env.REACT_APP_HOST}/subjects`)
        response.data.map(e => {
            subjectsOptions.push({value: e.name, label: e.name})
            return subjectsOptions
        })
        setSubjects(subjectsOptions)
    }
    catch(e){
        console.log(e)
    }
}

async function getProfessorsBySubject ({setProfessors, event, subject}) {
    console.log(event.target.value)
    const param = event.target.value

    const professorsOptions = []
    try{
        const response = await axios.get(`${process.env.REACT_APP_HOST}/professors/${param}`)

        response.data.map(e => {
            professorsOptions.push({value: e.name, label: e.name})
            return professorsOptions
        })
        setProfessors(professorsOptions)
    }
    catch(e) {
        console.log(e)
    }
}

async function getAllProfessors (setProfessors) {
    try{
        const professors = await axios.get(`${process.env.REACT_APP_HOST}/professors`)
        return setProfessors(professors.data)
    }
    catch(e) {
        console.log(e)
        alert('Ocorreu um erro')
    }
}

async function getTests (setTests) {
    try{
        const tests = await axios.get(`${process.env.REACT_APP_HOST}/tests`)
        return setTests(tests.data)
    }
    catch(e) {
        console.log(e)
        alert('Ocorreu um erro')
    }
}

export { getSubject, getProfessorsBySubject, getAllProfessors, getTests }

