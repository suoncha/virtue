import { GitHub } from "@mui/icons-material"
import { AppBar, Button, Stack, Toolbar, ImageListItem, Typography, IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { openAbout, openChangelog, openFeedback } from "../reducers/barSet"

export const InfoBar = () => {
    const dispatch = useDispatch()

    return (
        <AppBar sx={{paddingTop: '0vh', backgroundColor: '#000000'}}>
            <Toolbar>
                <ImageListItem sx={{width: '5vw'}}>
                    <img src="/images/logo.png"></img>
                </ImageListItem>
                <Typography fontSize='1vw' paddingLeft='0.5vw' paddingRight='0.5vw'> - A GAME OF H.VŨ & A.VŨ |</Typography>
                <Stack direction='row' spacing='1vw'>
                    <Button color='inherit' onClick={() => dispatch(openAbout())}>About</Button>
                    <Button color='inherit' onClick={() => dispatch(openChangelog())}>Changelog</Button>
                    <Button color='inherit' onClick={() => dispatch(openFeedback())}>Feedback</Button>
                    <Button color='inherit' href="https://youtu.be/MPY7JsVZVno">Demo</Button>
                    <IconButton color='inherit' href='https://github.com/suoncha/virtue'>
                        <GitHub></GitHub>
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}