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

async function getSubjects (setSubjects) {
    try{
        const response = await axios.get(`${process.env.REACT_APP_HOST}/subjects`)
        setSubjects(response.data)
    }
    catch(e){
        console.log(e)
    }
}

async function getProfessorsBySubject ({setProfessors, event, subject}) {
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
    }
}

async function getTests (setTests) {
    try{
        const tests = await axios.get(`${process.env.REACT_APP_HOST}/tests`)
        return setTests(tests.data)
    }
    catch(e) {
        console.log(e)
    }
}

async function getCategories (setCategories) {
    try{
        const categories = await axios.get(`${process.env.REACT_APP_HOST}/categories`)
        return setCategories(categories.data)
    }
    catch(e) {
        console.log(e)
    }
}

async function getTestsByCategory ({setTestsFiltered, setOpenTests, categorySelected, professor}) {
    try{
        const tests = await axios.get(`${process.env.REACT_APP_HOST}/testsByCategory/${professor.id}/${categorySelected}`)
        console.log(tests.data)
        if(tests.data.length) setOpenTests(true)
        return setTestsFiltered(tests.data)
    }
    catch(e){
        console.log(e)
    }
}

export { getSubject, getProfessorsBySubject, getAllProfessors, getTests, getCategories, getTestsByCategory, getSubjects }

