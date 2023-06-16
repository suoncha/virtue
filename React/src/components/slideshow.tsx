import { Box, ImageListItem } from "@mui/material"
import Carousel from 'react-material-ui-carousel'

export const Slideshow = () => {
    var items = [
        {src: "/images/s1.png"},
        {src: "/images/s2.png"},
        {src: "/images/s3.png"},
        {src: "/images/s4.png"},
    ]

    return (  
        <Box sx={{paddingX: '0.5vw'}}>
            <Carousel
            sx={{
                borderRadius: '3vw',
            }}
            navButtonsAlwaysInvisible 
            animation="slide" duration={1000} interval={3000}
            swipe={false} indicators={false}
            stopAutoPlayOnHover={false}
            changeOnFirstRender={true}> 
            {
                items.map( (item, i) => 
                <ImageListItem key={i}>
                    <img src={item.src}></img>
                </ImageListItem>)
            }
            </Carousel>  
        </Box>  
    )
}