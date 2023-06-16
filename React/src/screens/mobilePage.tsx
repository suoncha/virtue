import { Box, ImageListItem, Typography } from "@mui/material";
import { Copyright } from "../components/copyright";

export const MobilePage = () => {
    return (
        <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        sx={{
            backgroundColor: '#4b878b',
        }}
        >   
            <ImageListItem sx={{
                paddingTop: '10vh',
                paddingBottom: '10vh',
                width: {
                    xs: '80vw',
                    sm: '60vw',
            }}}>
                <img src="/images/logo.png"></img>
            </ImageListItem>
            <ImageListItem sx={{
                width: {
                    xs: '80vw',
                    sm: '50vw',
            }}}>
                <img src="/images/mobile-notif.png"></img>
            </ImageListItem>         
            <Box paddingTop="3vh" >
                <Typography color="white" align="center" fontSize={{
                    xs: '5vw',
                }}>
                    This game hasn't supported mobile yet
                </Typography>
                <Typography color="white" align="center" fontSize={{
                    xs: '5vw',
                }}>
                    Please open the website on a PC
                </Typography>
            </Box>
            <Box paddingTop="15vh">
                <Copyright/>
            </Box>
        </Box>
    )
}
