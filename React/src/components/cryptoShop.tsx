import { 
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Grid,
    Box
} from '@mui/material'
import { blueButtonStyle, redButtonStyle } from '../styles/button';
import { useState } from 'react';
import { ethers } from "ethers";

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { closeCryptoShop } from '../reducers/barSet';
import { connectMetamask } from '../reducers/walletSet';
import { successNof, errorNof } from '../reducers/nofBar';

export const CryptoShop = () => {
    const dispatch = useDispatch()
    const shopStatus = useSelector((state: RootState) => state.bar.cryptoShop)
    const metamaskStatus = useSelector((state: RootState) => state.wallet.metamask)

    function handleClose() {
        dispatch(closeCryptoShop())
    };

    async function handleConnect() {
        // no more code for u
    }

    return (
        <Dialog open={shopStatus} onClose={handleClose} fullWidth>
        <DialogTitle>
            <Typography fontSize='2vw' fontWeight='900'>
                Crypto Shop
            </Typography>
        </DialogTitle>

        <DialogContent>
            <Typography fontSize='1vw' fontWeight='700'>
            We have stopped supporting this game, so I guess there will be no crypto shop :{")"}
            </Typography>
            <Typography fontSize='1vw' fontWeight='700'>
            You can just switch between crypto items in-game using the I key
            </Typography>
        </DialogContent>

        <DialogActions>
            <Button variant="contained" sx={blueButtonStyle} onClick={() => handleClose()}> 
                Close
            </Button>
        </DialogActions>
    </Dialog>
    )
}