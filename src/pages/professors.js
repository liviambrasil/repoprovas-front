import { List, ListItem, ListSubheader, ListItemText, Collapse, Container } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getAllProfessors, getCategories, getTests } from "../requests/getData"
import { makeStyles } from '@material-ui/core/styles';

export default function Professors () {
    const [professors, setProfessors] = useState([])
    const [open, setOpen] = useState(false)
    const [tests, setTests] = useState([])
    const [professor, setProfessor] = useState()
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState()
    const [secondOpen, setSecondOpen] = useState(false)
    const [testsFiltered, setTestsFiltered] = useState([])


    useEffect(() => {
        getAllProfessors(setProfessors)
        getTests(setTests)
        getCategories(setCategories)
    }, [])

    function filterTests(categoryId, professorName) {
        console.log('entrou')
        const arr = (tests.filter((test) => test.professor.name === professorName && categoryId === test.categoryId))
        console.log(arr)
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

    if(!professors.length) return <>Carregando </>
    else{
        return(
            <Container>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Nested List Items
                        </ListSubheader>
                    }
                    className={classes.root} >
                    {professors.map((e) => {
                        const testsFromProfessor = tests.filter((element) => element.professorId === e.id)
                        return (
                            <>
                            <ListItem button onClick={() => {setOpen(!open)
                                                            setProfessor(e)}}>
                                <ListItemText primary={`${e.name} (${testsFromProfessor.length})`} />
                                {open && professor.name === e.name ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            {categories.map((category) => {
                                const testsFromSemesters = testsFromProfessor.filter((element) => element.categoryId === category.id)
                                return(
                                    <Collapse in={open && professor.name === e.name} timeout="auto" unmountOnExit>
                                        <List component="nav" aria-labelledby="nested-list-subheader" disablePadding>
                                            <ListItem button className={classes.nested} onClick={() => {setSecondOpen(!secondOpen)
                                                                                                        setCategorySelected(category.id)
                                                                                                        filterTests(category.id, professor.name)}}>
                                                <ListItemText primary={`${category.name} (${testsFromSemesters.length})`} />
                                                {secondOpen && categorySelected === category.id ? <ExpandLess /> : <ExpandMore />}
                                            </ListItem>

                                            {testsFiltered.map((testFiltered) => {
                                                return(
                                                    <Collapse in={secondOpen && categorySelected === category.id}>
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
                                    </Collapse>
                                )
                            })}
                            </>
                        )
                    })}
                </List>
            </Container>
        )
    }
    
}
