import axios from "axios";

async function getSubject (setSubjects) {
    const subjectsOptions = []
    try{
        const response = await axios.get(`${process.env.REACT_APP_HOST}/subjects`)
        response.data.map(e => {
            subjectsOptions.push({value: e.name, label: e.name})
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
        })
        setProfessors(professorsOptions)
    }
    catch(e) {
        console.log(e)
    }
}

export { getSubject, getProfessorsBySubject }

