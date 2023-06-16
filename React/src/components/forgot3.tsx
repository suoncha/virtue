import { 
    Button,
    Link,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton } from "@mui/material";
import { redButtonStyle } from "../styles/button";
import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { switchPage } from "../reducers/pageSwitch";
import { errorNof, successNof } from "../reducers/nofBar";
import { changePassword } from "../reducers/fieldSwitch";
import { postChangePassword } from "../services/auth";

export const Forgot3 = () => {
    const dispatch = useDispatch()
    const email = useSelector((state: RootState) => state.field.email)
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    async function handleChangePassword() {
        if (password1 != password2) dispatch(errorNof("Mismatch passwords"));
        else if (password1 == '') dispatch(errorNof("Empty input"))
        else try {
            await postChangePassword(email, password1, localStorage.gameToken);
            dispatch(successNof("Password changed successfully"));
            dispatch(changePassword(password1));
            localStorage.removeItem("gameToken");
            dispatch(switchPage(0));
        } catch (err: any) {
            err.response.status == 400 ?
            dispatch(errorNof("Password must be longer than 6 characters")) :
            dispatch(errorNof("Please reload the page"));
        }
    }

    return (
        <Grid container alignItems='center' direction='column'>
            <Grid item alignSelf='flex-start' paddingX='1vw' paddingTop='20vh'>
                <Link color="#Aa292d"  underline="none">
                    <Typography fontWeight='900' fontSize='1vw'>Enter your new password</Typography>
                </Link>
            </Grid>
            <FormControl size="small" margin="dense" error sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.5vw',
                        margin: '5px',
                        width: {md: '28vw', lg: '26vw'},     
                    }}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                        type={showPassword1 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword1}>
                                {showPassword1 ? <VisibilityOff color="error" /> : <Visibility color="error" />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Password'
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
            </FormControl>
            <Grid item alignSelf='flex-start' paddingX='1vw' paddingTop='0vh'>
                <Link color="#Aa292d"  underline="none">
                    <Typography fontWeight='900' fontSize='1vw'>Re-enter your new password</Typography>
                </Link>
            </Grid>
            <FormControl size="small" margin="dense" error sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.5vw',
                        margin: '5px',
                        width: {md: '28vw', lg: '26vw'},     
                    }}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                        type={showPassword2 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword2}>
                                {showPassword2 ? <VisibilityOff color="error" /> : <Visibility color="error" />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Password'
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
            </FormControl>  
            <Grid item width='20vw' paddingTop='2vh'>
                <Button fullWidth variant="contained" sx={redButtonStyle} onClick={() => handleChangePassword()}>
                    NEXT 
                </Button>
            </Grid>           
        </Grid>
    )
}