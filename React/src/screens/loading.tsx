import { Box, Grid, ImageListItem, Stack, Typography } from "@mui/material";
import { Copyright } from "../components/copyright";

export const LoadingScreen = (loadingPercentage: number) => {
    return (   
        <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100vh', backgroundImage: 'url(/images/loading.jpg)', backgroundSize: 'cover'}}
        >
        <Typography fontSize='3vw' fontWeight='900' justifyItems='center' color="white" alignSelf='center'>
            Loading... ({loadingPercentage}%)
        </Typography>
      </Grid>
    )
}
