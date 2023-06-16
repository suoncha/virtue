import { 
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton } from "@mui/material";
import { useState } from "react";
import { redButtonStyle } from "../styles/button";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { switchPage } from "../reducers/pageSwitch";
import { errorNof } from "../reducers/nofBar";
import { changePassword, changeUsername, changeEmail } from "../reducers/fieldSwitch";
import { postCreateUser } from "../services/auth";

export const Register1 = () => {
    const dispatch = useDispatch()
    const email = useSelector((state: RootState) => state.field.email)
    const username = useSelector((state: RootState) => state.field.username)
    const password = useSelector((state: RootState) => state.field.password)
    const [password2, setPassword2] = useState('')
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    async function handleRegister() {
        if (password != password2) dispatch(errorNof("Mismatch passwords"));
        else if (password == '' || email == '' || username == '') dispatch(errorNof("Empty input"))
        else if (username.length < 6 || username.length > 12) dispatch(errorNof("Username must be between 6-12 characters"))
        else if (password.length < 6) dispatch(errorNof("Password must be longer than 6 characters"))
        else try {
            await postCreateUser(username, email, password);
            dispatch(switchPage(5));
        } catch (err: any) {
            err.response.status == 400 ?
            dispatch(errorNof("Invalid email")) :
            dispatch(errorNof("Account already exists"));
        }
    }

    return (
        <Grid container alignItems='center' direction='column'>
            <Grid item alignSelf='flex-start' paddingX='1vw' paddingTop='10vh'>
                <Link color="#Aa292d"  underline="none">
                    <Typography fontWeight='900' fontSize='1vw'>Enter your username</Typography>
                </Link>
            </Grid>
            <Grid item>
                <TextField size='small' label="Username" autoComplete="username" error sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.5vw',
                        margin: '5px',
                        width: {md: '28vw', lg: '26vw'},
                    }}
                    value={username}
                    onChange={(e) => dispatch(changeUsername(e.target.value))}
                />
            </Grid>
            <Grid item alignSelf='flex-start' paddingX='1vw' >
                <Link color="#Aa292d"  underline="none">
                    <Typography fontWeight='900' fontSize='1vw'>Enter your email</Typography>
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
            <Grid item alignSelf='flex-start' paddingX='1vw'>
                <Link color="#Aa292d"  underline="none">
                    <Typography fontWeight='900' fontSize='1vw'>Enter your new password</Typography>
                </Link>
            </Grid>
            <FormControl size="small" margin="dense" error sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.5vw',
                        margin: '6px',
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
                        value={password}
                        onChange={(e) => dispatch(changePassword(e.target.value))}
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
            <Grid item width='20vw' paddingTop='3vh'>
                <Button fullWidth variant="contained" sx={redButtonStyle} onClick={() => handleRegister()}>
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