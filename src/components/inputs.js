import { styled, TextField } from "@material-ui/core"

function SelectInput(props) {
    const {label, value, onChange, variant, SelectProps, options} = props

    return (
        <MyInput    select
                    required
                    label={label}
                    value={value}
                    onChange={onChange}
                    variant={variant}
                    SelectProps={SelectProps}
                    >

            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
            </option>))}

        </MyInput>
    )
}

function TextInput (props) {
    const { variant, label, onChange } = props

    return (
        <MyInput  required 
                    variant={variant}
                    label={label}
                    onChange={onChange}
                    />
    )
}

const MyInput = styled(TextField)({
    margin: '10px',
    width: '100%',
})



export { SelectInput, TextInput }