import { Button, styled } from "@material-ui/core";

function MyButton ({variant, color, size, startIcon, label, type}) {
    return(
        <MyButtonStyle variant={variant}
                color={color} 
                size={size}
                startIcon={startIcon}
                type={type}>
            {label}
        </MyButtonStyle>
    )
}

const MyButtonStyle = styled(Button)({
    marginTop: '10px',
    width: '100%'
})

export { MyButton }