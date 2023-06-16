import { 
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    ImageListItem, 
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { redButtonStyle } from "../styles/button";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Copyright } from "../components/copyright";

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { SaveInfo, setGame } from "../reducers/gameSet";
import { switchPage } from "../reducers/pageSwitch";
import { errorNof, successNof } from "../reducers/nofBar";
import { changePassword, changeUsername } from "../reducers/fieldSwitch";
import { postLogin } from "../services/auth";

export const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useSelector((state: RootState) => state.field.username)
    const password = useSelector((state: RootState) => state.field.password)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    async function handleLogin() {
        if (username == '' || password == '') dispatch(errorNof("Empty input"));
        else if (username.length < 6 || username.length > 12) dispatch(errorNof("Username must be between 6-12 characters"))
        else if (password.length < 6) dispatch(errorNof("Password must be longer than 6 characters"))
        else try {
            const res = await postLogin(username, password);
            localStorage.gameToken = res.data.accessToken;
            dispatch(successNof("Logged in successfully"));
            dispatch(switchPage(6));
        } catch (err: any) {
            err.response.status == 400 ?
            dispatch(errorNof("Invalid input")) :
            dispatch(errorNof("Your credentials are invalid")); 
        }
    }

    async function handlePlayGuest() {
        const guestInfo = {
            hpRate: 0,
            death: 0,
            win: 0,
            plays: 0
        } as SaveInfo
        dispatch(setGame(guestInfo))
    }

    useEffect(() => {
        if (localStorage.gameToken) dispatch(switchPage(6));
    });

    return (
        <Grid container alignItems='center' direction='column'>
            <Grid item alignSelf='flex-end' paddingTop='4vh' paddingRight='3vw'>
            </Grid>
            <Grid item>
                <ImageListItem sx={{width: '25vw'}}>
                    <img src="/images/logo.png"></img>
                </ImageListItem>
            </Grid>
            <Grid item width='20vw' paddingTop='8vh'>
                <Button fullWidth variant="contained" sx={redButtonStyle} onClick={() => handlePlayGuest()}> 
                    Play as guest
                </Button>
            </Grid>
            <Grid item alignSelf='flex-end' paddingTop={{md: '0.5vh', lg: '20vh'}} paddingX='2.5vw'>
                <Copyright/>
            </Grid>
            
        </Grid>
    )
}