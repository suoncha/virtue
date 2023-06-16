import { 
    Button,
    TextField,
    Link,
    Grid,
    Typography } from "@mui/material";
import { redButtonStyle } from "../styles/button";
import { useState } from "react";

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { switchPage } from "../reducers/pageSwitch";
import { errorNof, successNof } from "../reducers/nofBar";
import { postSendOTP, postValidateOTP } from "../services/auth";

export const Register2 = () => {
    const dispatch = useDispatch()
    const email = useSelector((state: RootState) => state.field.email)
    const [otp, changeOtp] = useState('')

    async function handleValidateOTP() {
        try {
            await postValidateOTP(email, otp);
            dispatch(successNof("Account created"));
            dispatch(switchPage(0));
        } catch (err: any) {
            err.response.status == 400 ?
            dispatch(errorNof("Empty input")) :
            dispatch(errorNof("Mismatch OTP"));
        }
    }

    return (
        <Grid container alignItems='center' direction='column'>
            <Grid item alignSelf='flex-start' paddingX='1vw' paddingTop='20vh'>
                <Link color="#Aa292d"  underline="none">
                    <Typography fontWeight='900' fontSize='1vw'>Enter your OTP code</Typography>
                </Link>
            </Grid>
            <Grid item>
                <TextField size='small' label="OTP" autoComplete="one-time-code" error sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.5vw',
                        margin: '5px',
                        width: {md: '28vw', lg: '26vw'},
                    }}
                    onChange={(e) => changeOtp(e.target.value)}
                />
            </Grid>
            <Grid item alignSelf='flex-end' paddingX='2.5vw'>
                <Link color="#Aa292d" href='#' underline="none" onClick={() => postSendOTP(email)}>
                    <Typography fontWeight='700' fontSize='1vw'>Resend</Typography>
                </Link>
            </Grid>  
            <Grid item width='20vw' paddingTop='2vh'>
                <Button fullWidth variant="contained" sx={redButtonStyle} onClick={() => handleValidateOTP()}>
                    NEXT 
                </Button>
            </Grid>  
            <Grid item alignSelf='flex-end' paddingX='2.5vw' paddingTop='0.5vh'>
                <Link color="#Aa292d" href='#' underline="none" onClick={() => dispatch(switchPage(4))}>
                    <Typography fontWeight='700' fontSize='1vw'>Go back</Typography>
                </Link>
            </Grid>          
        </Grid>
    )
}