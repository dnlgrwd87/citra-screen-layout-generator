'use client';

import { Box, Modal } from '@mui/material';
import { RefObject } from 'react';
import { Rnd } from 'react-rnd';

interface Props {
    topScreen: RefObject<Rnd>;
    bottomScreen: RefObject<Rnd>;
    open: boolean;
    onClose: () => void;
}

export default function ConfigValuesModal({ topScreen, bottomScreen, onClose, open }: Props) {
    if (!topScreen.current || !bottomScreen.current) {
        return null;
    }

    const getScreenData = (screen: RefObject<Rnd>) => {
        const { x, y } = screen.current!.getDraggablePosition();
        const width = screen.current!.getSelfElement()?.offsetWidth!;
        const height = screen.current!.getSelfElement()?.offsetHeight!;

        const top = y;
        const bottom = y + height;
        const left = x;
        const right = x + width;

        return {
            top: top * 2,
            bottom: bottom * 2,
            left: left * 2,
            right: right * 2,
        };
    };

    const getConfigValues = (direction: string, screen: RefObject<Rnd>) => {
        const { top, bottom, left, right } = getScreenData(screen);

        return (
            <>
                <p>
                    custom_{direction}_top={top}
                </p>
                <p>
                    custom_{direction}_bottom={bottom}
                </p>
                <p>
                    custom_{direction}_left={left}
                </p>
                <p>
                    custom_{direction}_right={right}
                </p>
            </>
        );
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <pre>
                    <p>custom_layout\default=false</p>
                    <p>custom_top_left\default=false</p>
                    <p>custom_top_top\default=false</p>
                    <p>custom_top_right\default=false</p>
                    <p>custom_top_bottom\default=false</p>
                    <p>custom_bottom_left\default=false</p>
                    <p>custom_bottom_top\default=false</p>
                    <p>custom_bottom_right\default=false</p>
                    <p>custom_bottom_bottom\default=false</p>
                    <br />
                    {getConfigValues('top', topScreen)}
                    <br />
                    {getConfigValues('bottom', bottomScreen)}
                </pre>
            </Box>
        </Modal>
    );
}
