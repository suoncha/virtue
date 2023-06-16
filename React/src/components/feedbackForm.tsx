import { 
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Typography
} from '@mui/material'
import { blueButtonStyle, redButtonStyle } from '../styles/button';
import { useState } from 'react';

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { closeFeedback } from '../reducers/barSet';
import { successNof, errorNof } from '../reducers/nofBar';
import { postCreateFeedback } from '../services/feedback';

export const FeedbackForm = () => {
    const dispatch = useDispatch()
    const feedbackStatus = useSelector((state: RootState) => state.bar.feedback)
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    function handleClose() {
        dispatch(closeFeedback())
    };

    async function handleSubmit() {
        try {
            await postCreateFeedback(name, content);
            dispatch(successNof("Thanks you for your feedback!"))
            handleClose()
        } catch (err: any) {
            err.response.status == 400 ?
            dispatch(errorNof("Empty input")) :
            dispatch(errorNof("Please reload the page"));
        }
    }

    return (
        <Dialog open={feedbackStatus} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Typography fontSize='2vw' fontWeight='900'>
                    Feedback
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography fontSize='1vw' fontWeight='900'>
                We have stopped supporting this game, but you can still use this form. 
                Obviously, we won't make any more changes to the game.
                </Typography>
                <Typography fontSize='1vw' fontWeight='700'>
                    You can help us improving this game by submitting this form.
                    Any help would be appreciated.
                </Typography>
                <Typography fontSize='1.2vw' fontWeight='700'>
                    What should I call you?
                </Typography>
                <TextField margin="dense" fullWidth onChange={(e) => setName(e.target.value)}/>
                <Typography fontSize='1.2vw' fontWeight='700'>
                    What change do you want to make?
                </Typography>
                <TextField margin="dense" fullWidth multiline onChange={(e) => setContent(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={blueButtonStyle} onClick={() => handleClose()}> 
                    Close
                </Button>
                <Button variant="contained" sx={redButtonStyle} onClick={() => handleSubmit()}> 
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}