'use client';

import { Alert, Button, ButtonProps, Portal, Snackbar } from '@mui/material';
import { useState } from 'react';

interface Props extends ButtonProps {
    copyText: string;
    successMessage?: string;
    errorMessage?: string;
}

export default function CopyButton(props: Props) {
    const { copyText, successMessage, errorMessage, ...buttonProps } = props;

    const [showSnackBar, setShowSnackbar] = useState(false);
    const [error, setError] = useState(false);

    const onClick = async () => {
        try {
            setError(false);

            await navigator.clipboard.writeText(props.copyText);

            setShowSnackbar(true);
        } catch (err) {
            setError(true);
            setShowSnackbar(true);
        }
    };

    const onCloseSnackBar = () => {
        setShowSnackbar(false);
    };

    const snackbarMessage = error
        ? errorMessage || 'Could not copy text'
        : successMessage || 'Successfully copied';

    return (
        <>
            <Button {...buttonProps} onClick={onClick}>
                {props.children}
            </Button>
            <Portal>
                <Snackbar
                    open={showSnackBar}
                    autoHideDuration={3000}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    onClose={onCloseSnackBar}
                    message={snackbarMessage}
                >
                    <Alert
                        onClose={onCloseSnackBar}
                        severity={error ? 'error' : 'success'}
                        variant="filled"
                        sx={{
                            background: error ? '#d32f2f' : '#3ea643',
                        }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Portal>
        </>
    );
}
