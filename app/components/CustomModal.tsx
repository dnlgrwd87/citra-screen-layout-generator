'use client';

import { Backdrop, Box, Fade, ModalProps, Modal as MuiModal, SxProps } from '@mui/material';

interface Props extends ModalProps {
    contentStyles?: SxProps;
}

export default function Modal(props: Props) {
    const { contentStyles, ...modalProps } = props;

    return (
        <MuiModal
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            {...modalProps}
        >
            <Fade in={props.open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 300,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 24,
                        padding: 4,
                        ...props.contentStyles,
                    }}
                >
                    {props.children}
                </Box>
            </Fade>
        </MuiModal>
    );
}
