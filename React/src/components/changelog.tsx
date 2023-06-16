import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material';
import { blueButtonStyle } from '../styles/button';

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { closeChangelog, closeLastVersion } from '../reducers/barSet';
import Version from '../changelog.json';

export const Changelog = () => {
    const dispatch = useDispatch()
    const changelogStatus = useSelector((state: RootState) => state.bar.changelog)
    const lastVersionStatus = useSelector((state: RootState) => state.bar.lastVersion)
    
    function handleClose() {
        dispatch(closeLastVersion())
        dispatch(closeChangelog())
    };

    return (
        <Dialog open={changelogStatus} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Typography fontSize='2vw' fontWeight='900'>
                    Changelog
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography fontSize='1vw' fontWeight='700'>
                    Last update: {Version.version[0].date}
                </Typography>
                {
                    Version.version.map((item, i) => (
                        <Accordion elevation={10} key={i} expanded={i == 0 ? true : undefined}>
                        <AccordionSummary sx={{backgroundColor: '#d1d1d1'}} expandIcon={<ExpandMore/>}>
                            <Typography fontSize='1.2vw' fontWeight='700'>Version {item.date}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                Version.version[i].content.map((line, j) => (
                                    <Typography key={j}>
                                        - {line}
                                    </Typography>
                                ))
                            }
                        </AccordionDetails>
                        </Accordion>
                    ))
                }
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={blueButtonStyle} onClick={() => handleClose()}> 
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}