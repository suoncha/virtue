import { Snackbar, Alert, AlertProps } from "@mui/material";
import { forwardRef } from "react";

import type { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { closeNof } from "../reducers/nofBar";

const InfoAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
        return <Alert elevation={10} variant="filled" ref={ref} {...props}/>
    }
)

export const InfoSnackbar = (props: any) => {
    const dispatch = useDispatch()
    const nofStatus = useSelector((state: RootState) => state.nof.status)

    const handleClose = (
        event? : React.SyntheticEvent | Event, 
        reason? : string
    ) => {
        if (reason == "clickaway") return
        dispatch(closeNof())
    }

    return (
        <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }} 
        open={nofStatus} autoHideDuration={3000} onClose={handleClose}>
            <InfoAlert onClose={handleClose} severity={props.severity}>
                {props.text}
            </InfoAlert>
        </Snackbar>
    )
}