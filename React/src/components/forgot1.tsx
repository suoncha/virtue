import { 
    Button,
    TextField,
    Link,
    Grid,
    Typography } from "@mui/material";
import { redButtonStyle } from "../styles/button";

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { switchPage } from "../reducers/pageSwitch";
import { errorNof } from "../reducers/nofBar";
import { changeEmail } from "../reducers/fieldSwitch";
import { postSendOTP } from "../services/auth";

export const Forgot1 = () => {
    const dispatch = useDispatch()
    const email = useSelector((state: RootState) => state.field.email)
    
    async function handleSendOTP() {
        try {
            await postSendOTP(email);
            dispatch(switchPage(2));
        } catch (err: any) {
            email == '' ? dispatch(errorNof("Empty input")) :
            err.response.status == 400 ?
            dispatch(errorNof("Invalid email")) :
            dispatch(errorNof("Account doesn't exist"));
        }
    }

    return (
        <Grid container alignItems='center' direction='column'>
            <Grid item alignSelf='flex-start' paddingX='1vw' paddingTop='20vh'>
                <Link color="#Aa292d"  underline="none">
                    <Typography fontWeight='900' fontSize='1vw'>Enter your registration email</Typography>
                </Link>
            </Grid>
            <Grid item>
                <TextField size='small' label="Email" autoComplete="email" error sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.5vw',
                        margin: '5px',
                        width: {md: '28vw', lg: '26vw'},
                    }}
                    value={email} 
                    onChange={(e) => dispatch(changeEmail(e.target.value))}
                />
            </Grid>
            <Grid item width='20vw' paddingTop='5vh'>
                <Button fullWidth variant="contained" sx={redButtonStyle} onClick={() => handleSendOTP()}>
                    NEXT 
                </Button>
            </Grid>  
            <Grid item alignSelf='flex-end' paddingX='2.5vw' paddingTop='0.5vh'>
                <Link color="#Aa292d" href='#' underline="none" onClick={() => dispatch(switchPage(0))}>
                    <Typography fontWeight='700' fontSize='1vw'>Go back</Typography>
                </Link>
            </Grid>          
        </Grid>
    )
}