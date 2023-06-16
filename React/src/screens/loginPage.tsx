import { 
    Grid,
    Paper,
    Stack, } from "@mui/material";

import type { RootState } from "../store";
import { useSelector } from 'react-redux'

import { Slideshow } from "../components/slideshow";
import { InfoBar } from "../components/appBar";
import { LoginForm } from "../components/loginForm";
import { Forgot1 } from "../components/forgot1";
import { Forgot2 } from "../components/forgot2";
import { Forgot3 } from "../components/forgot3";
import { Register1 } from "../components/register1";
import { Register2 } from "../components/register2";
import { InfoSnackbar } from "../components/snackBar";
import { SaveList } from "../components/saveList";
import { FeedbackForm } from "../components/feedbackForm";
import { Changelog } from "../components/changelog";
import { LastVersionCard } from "../components/lastVersion";
import { AboutDialog } from "../components/about";

export const LoginPage = () => {
    const pageState = useSelector((state: RootState) => state.page.page)
    const nofText = useSelector((state: RootState) => state.nof.message)
    const nofSeverity = useSelector((state: RootState) => state.nof.severity)

    return (
      <Stack direction='row' sx={{ height: '100vh', backgroundImage: 'url(/images/splash3.jpeg)', backgroundSize: 'cover' }}>
        <InfoBar></InfoBar>
        <Paper elevation={4} sx={{
            marginX: '5vw',
            marginY: {md: '18vh', lg: '15vh'},
            width: '100vw',
            backgroundColor: '#fffff0cb',
            borderRadius: '5vw'
        }}>
          <Grid container>
            <Grid alignSelf='center' padding={2} item xs={8}>
              <Slideshow></Slideshow>
            </Grid>
            <Grid item xs={4}>
              {
                pageState == 0 ? <LoginForm></LoginForm> :
                pageState == 1 ? <Forgot1></Forgot1> :
                pageState == 2 ? <Forgot2></Forgot2> :
                pageState == 3 ? <Forgot3></Forgot3> : 
                pageState == 4 ? <Register1></Register1> : 
                pageState == 5 ? <Register2></Register2> :
                <SaveList></SaveList>
              }
            </Grid>
          </Grid>
        </Paper>
        <LastVersionCard></LastVersionCard>
        <AboutDialog></AboutDialog>
        <Changelog></Changelog>
        <FeedbackForm></FeedbackForm>
        <InfoSnackbar severity={nofSeverity} text={nofText}></InfoSnackbar>
      </Stack>
    )
}
