import { TextField } from "@material-ui/core";
import styled from "styled-components";

export default function NewTest (){
    const currencies = [
        {
          value: 'P1',
          label: 'P1',
        },
        {
          value: 'P2',
          label: 'P2',
        },
        {
            value: 'P3',
            label: 'P3',
        },
        {
            value: '2CH',
            label: '2CH',
        },
        {
            value: 'Outras',
            label: 'Outras',
        }
    ]

    return(
        <Container>
            <Form autoComplete="on">
            <TextField  required 
                        defaultValue="2020/1" 
                        variant="outlined"
                        label="Nome"/>

            <TextField  select
                        label="Categoria"
                        value={currencies}
                        variant="outlined"
                        SelectProps={{
                            native: true,
                        }}>
            {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
            </TextField>
            </Form>
        </Container>
        
    )
}

const Form = styled.form`
    height: auto;
`

const Container = styled.div`
    width:100%;
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`