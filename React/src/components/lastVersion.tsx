import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

import { useDispatch } from 'react-redux'
import { openChangelog, openLastVersion } from '../reducers/barSet';
import Version from '../changelog.json';

export const LastVersionCard = () => {
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(openLastVersion())
        dispatch(openChangelog())
    }

    return (
        <Card sx={{ position: 'absolute', bottom: 10, left: 10 }}>
        <CardActionArea onClick={() => handleClick()}>
            <CardContent>
            <Typography fontSize='1.5vw' fontWeight='500'>
                Version {Version.version[0].date}
            </Typography>
            <Typography sx={{color: '#Aa292d'}} fontSize='1vw' fontWeight='900'>
                Check out now
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}