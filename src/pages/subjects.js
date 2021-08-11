import { Collapse, List, ListItem, ListItemText, ListSubheader, makeStyles } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { useEffect, useState } from "react"
import styled from "styled-components";
import { getSemesters, getSubjects, getTests } from "../requests/getData"
import { Container } from "../styles/layoutStyles";

export default function Subjects () {

    const [subjects, setSubjects] = useState([])
    const [tests, setTests] = useState([])
    const [subject, setSubject] = useState()
    const [open, setOpen] = useState(false)
    const [semesters, setSemesters] = useState([])
    const [semesterSelected, setSemesterSelected] = useState()
    const [secondOpen, setSecondOpen] = useState()
    const [testsFiltered, setTestsFiltered] = useState([])


    useEffect(() => {
        getSubjects(setSubjects)
        getTests(setTests)
        getSemesters(setSemesters)
    }, [])

    function filterTests(semesterId, subjectName) {
        const arr = (tests.filter((test) => test.subject.name === subjectName && semesterId === test.subject.semesterId))
        if(arr) setTestsFiltered(arr)
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
        nested: {
          paddingLeft: theme.spacing(4),
        },
      }));
    const classes = useStyles();

    if(!subjects.length) return <>Carregando </>

    return(
        <Margin>
            <Container>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Selecione a disciplina
                        </ListSubheader>
                    }
                    className={classes.root} >
                    
                    {subjects.map((e) => {
                        const testsFromSubjects = tests.filter((element) => element.subjectId === e.id)
                        return (
                            <>
                                <ListItem button onClick={() => {setOpen(!open)
                                                                setSubject(e)}}>
                                    <ListItemText primary={`${e.name} (${testsFromSubjects.length})`} />
                                    {open && subject.name === e.name ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>

                                {semesters.map((semester) => {
                                    const testsFromSemester = testsFromSubjects.filter((element) => element.subject.semesterId === semester.id)
                                    return(
                                        <Collapse in={open && subject.name === e.name} timeout="auto" unmountOnExit>
                                            <List component="nav" aria-labelledby="nested-list-subheader" disablePadding>
                                                <ListItem button className={classes.nested} onClick={() => {setSecondOpen(!secondOpen)
                                                                                                            setSemesterSelected(semester.id)
                                                                                                            filterTests(semester.id, subject.name)}}>
                                                    <ListItemText primary={`${semester.name} (${testsFromSemester.length})`} />
                                                    {secondOpen && semesterSelected === semester.id ? <ExpandLess /> : <ExpandMore />}
                                                </ListItem>
                                                
                                                {testsFiltered.map((testFiltered) => {
                                                    return(
                                                        <Collapse in={secondOpen && semesterSelected === semester.id}>
                                                            <List component="div" disablePadding>
                                                                <a href={testFiltered.link}>
                                                                    <ListItem button className={classes.nested}>
                                                                        <ListItemText primary={`${testFiltered.subject.name} - ${testFiltered.name}`}/>
                                                                    </ListItem>
                                                                </a>
                                                            </List>
                                                        </Collapse>
                                                    )})}
                                            </List>
                                        </Collapse>)}
                                )}
                            </>
                        )
                    })}
                        
                </List>
            </Container>
        </Margin>
    )
}

export const Margin = styled.div`
    margin-top: 50px;

    @media(max-width: 650px) {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }
`