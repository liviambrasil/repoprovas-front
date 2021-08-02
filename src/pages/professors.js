import { List, ListItem, ListSubheader, ListItemText, Collapse, Container } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getAllProfessors, getTests } from "../requests/getData"
import { makeStyles } from '@material-ui/core/styles';

export default function Professors () {
    const [professors, setProfessors] = useState([])
    const [open, setOpen] = useState(false)
    const [tests, setTests] = useState([])
    const [professor, setProfessor] = useState()

    useEffect(() => {
        getAllProfessors(setProfessors)
        getTests(setTests)
    }, [])

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
                        const testsFromProfessor = tests.filter((element) => element.professorsId === e.id)
                        console.log(testsFromProfessor)
                        return (
                            <>
                            <ListItem button onClick={() => {setOpen(!open)
                                                            setProfessor(e.name)}}>
                                <ListItemText primary={`${e.name} (${testsFromProfessor.length})`} />
                                {open && professor === e.name ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            {tests.map((test) => {
                                return(
                                    <Collapse in={open && professor === e.name} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested}>
                                                <ListItemText primary={test.professorsId === e.id ? test.name : ""} />
                                            </ListItem>
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
