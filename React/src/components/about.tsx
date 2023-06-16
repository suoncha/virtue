import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Typography,
    Box,
    Grid,
    IconButton,
    Link,
} from '@mui/material'
import { blueButtonStyle } from '../styles/button';

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { closeAbout } from '../reducers/barSet';
import { Facebook, GitHub, Google, LinkedIn } from '@mui/icons-material';

export const AboutDialog = () => {
    const dispatch = useDispatch()
    const aboutStatus = useSelector((state: RootState) => state.bar.about)
    
    function handleClose() {
        dispatch(closeAbout())
    };

    return (
        <Dialog open={aboutStatus} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Typography fontSize='2vw' fontWeight='900'>
                    About us
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography fontSize='1vw' fontWeight='900' textAlign='center'>
                    We want to announce good news and bad news.
                </Typography>
                <Typography fontSize='1vw' fontWeight='900' textAlign='center'>
                    The good news is that our thesis managed to achieve a 4.0/4.0 score.
                </Typography>
                <Typography fontSize='1vw' fontWeight='900' textAlign='center' color="white" align="center">
                    <Link color="#Aa292d" href="https://drive.google.com/drive/folders/1hT_8cm4hYPa7gwHsWig0zEcaRXPDbDA0?usp=sharing" underline="none">You can read it here</Link>
                </Typography>
                <Typography fontSize='1vw' fontWeight='900' textAlign='center'>
                    And obviously, the bad news is:
                </Typography>
                <Typography fontSize='1.5vw' fontWeight='900' textAlign='center'>
                    This game is currently out of support
                </Typography>
                <Typography fontSize='1vw' fontWeight='700' textAlign='center'>
                    Welcome to Virtue! This is C2 and Thomas. In order to 
                    give a brief summary of this project, we'd like to partition
                    our whole story into six sections based on the Six W's.
                </Typography>
            <Grid container alignItems='center' direction='column'>
                <Grid item paddingTop='2vh'>
                    <Box sx={{ width: '35vw', alignSelf: 'center'}}
                    component="img"
                    src="/images/intro.png"
                    ></Box>
                </Grid>
                <Grid item>
                    <Typography fontSize='2vw' fontWeight='900'>
                        Why?
                    </Typography>
                </Grid>
                <Grid item alignSelf='flex-start'>
                    <Typography fontSize='1vw' fontWeight='700' textAlign='center'>
                        Our university has a mandatory subject called Graduation Project. 
                        As the name already says, it's required for us to come up with a topic, 
                        write a whole essay about it, and turn it into reality. Lucky for us, 
                        there's a lecturer who teaches game-related subjects at our school. 
                        He has had a great influence on our decision to choose a gaming topic. 
                        On top of that, HTML5 games have been kind of trendy recently thanks to 
                        the rise of metaverse and blockchain games. All of these contribute to 
                        the fact that we ended up doing this as a result.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography fontSize='2vw' fontWeight='900'>
                        What?
                    </Typography>
                </Grid>
                <Grid item alignSelf='center'>
                    <Typography fontSize='1vw' fontWeight='700' textAlign='center'>
                    So what does Virtue mean? Since both of our real names are Vũ and there're 
                    two of us, we came up with Virtue as a wordplay of Vũ and Two. Virtue is a 
                    3D Rogue-lite game (I do mind explaining what Rogue-lite games are here; you 
                    can research them on the internet or just play the game) that can be played 
                    completely in the browser. You can play as a guest or create an account to 
                    save your progress, and I'd recommend you do so.

                    
                    </Typography>
                    <Typography fontSize='1vw' fontWeight='700' textAlign='center'>
                    What makes this game special? Well, the majority of games out there have a 
                    constant, fixed difficulty increase, which could result in the game becoming 
                    too hard or too easy for some players. Virtue solves that problem by creating 
                    a dynamic difficulty increase (or decrease, if you are such a noob) that could
                    alter gameplay based on how well players perform. Our goal is to create a 
                    balanced and fair experience for everyone.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography fontSize='2vw' fontWeight='900'>
                        Where?
                    </Typography>
                </Grid>
                <Grid item alignSelf='center'>
                    <Typography fontSize='1vw' fontWeight='700' textAlign='center'>
                    Definitely not on our laptop.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography fontSize='2vw' fontWeight='900' >
                        When?
                    </Typography>
                </Grid>
                <Grid item alignSelf='flex-start'>
                    <Typography fontSize='1vw' fontWeight='700' textAlign='center'>
                    We have started doing this since January, when we are not working
                    our full-time jobs and side hustles (yes, we are part of a startup team). 
                    That messed up our sleep schedule quite a bit, and sometimes I wonder why 
                    I'm still alive.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography fontSize='2vw' fontWeight='900'>
                        How?
                    </Typography>
                </Grid>
                <Grid item alignSelf='flex-start'>
                    <Typography fontSize='1vw' fontWeight='700' textAlign='center'>
                    Lots of research, time, and effort. This project's main stack is Unity, 
                    React, and NestJS. We're going to share the whole 120-page thesis after 
                    finish it.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography fontSize='2vw' fontWeight='900'>
                        Who?
                    </Typography>
                </Grid> 
                <Grid item>
                    <Typography textAlign={'center'} fontSize='1.2vw' fontWeight='700'>
                        Thomas
                    </Typography>
                    <Grid container direction='row'>
                        <IconButton href='https://github.com/jesuisjohan'>
                            <GitHub></GitHub>
                        </IconButton>
                        <IconButton href='https://www.facebook.com/anhvu.maihoang.5'>
                            <Facebook></Facebook>
                        </IconButton>
                        <IconButton href='https://www.linkedin.com/in/mai-hoang-anh-vu/'>
                            <LinkedIn></LinkedIn>
                        </IconButton>
                        <IconButton href='mailto:thomas.maihoanganhvu@gmail.com'>
                            <Google></Google>
                        </IconButton>
                    </Grid>
                    <Typography textAlign={'center'} fontSize='1.2vw' fontWeight='700'>
                        C2
                    </Typography>
                    <Grid container direction='row'>
                        <IconButton href='https://github.com/suoncha'>
                            <GitHub></GitHub>
                        </IconButton>
                        <IconButton href='https://www.facebook.com/ph.kayn'>
                            <Facebook></Facebook>
                        </IconButton>
                        <IconButton href='https://www.linkedin.com/in/phvu2301/'>
                            <LinkedIn></LinkedIn>
                        </IconButton>
                        <IconButton href='mailto:vu.pham232001@gmail.com'>
                            <Google></Google>
                        </IconButton>
                    </Grid>
                </Grid>      
            </Grid>
                
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={blueButtonStyle} onClick={() => handleClose()}> 
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}