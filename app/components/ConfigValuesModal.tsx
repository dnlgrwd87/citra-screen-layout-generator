'use client';

import ContentCopy from '@mui/icons-material/ContentCopy';
import { Backdrop, Box, Button, Fade, Modal } from '@mui/material';
import { ScreenData } from '../types';

interface Props {
    topScreen: ScreenData;
    bottomScreen: ScreenData;
    open: boolean;
    onClose: () => void;
}

export default function ConfigValuesModal({ topScreen, bottomScreen, onClose, open }: Props) {
    const getScreenData = ({ x, y, width, height }: ScreenData) => {
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

    const getConfigValues = () => {
        const top = getScreenData(topScreen);
        const bottom = getScreenData(bottomScreen);

        return [
            'custom_layout=true',
            `custom_top_top=${top.top}`,
            `custom_top_bottom=${top.bottom}`,
            `custom_top_left=${top.left}`,
            `custom_top_right=${top.right}`,
            `custom_bottom_top=${bottom.top}`,
            `custom_bottom_bottom=${bottom.bottom}`,
            `custom_bottom_left=${bottom.left}`,
            `custom_bottom_right=${bottom.right}`,
        ];
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
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
                    <div className="flex justify-between items-center pb-4">
                        <div>Paste into qt-config.ini</div>
                        <Button
                            onClick={onCopy}
                            color="inherit"
                            disableElevation
                            sx={{
                                minWidth: 0,
                                padding: '5px 10px',
                                background: 'white',
                            }}
                        >
                            <ContentCopy />
                        </Button>
                    </div>
                    <pre>
                        <div className="text-sm l p-5 bg-gray-200 rounded-md shadow-md shadow-slate-300">
                            {getConfigValues().map((val) => (
                                <p key={val}>{val}</p>
                            ))}
                        </div>
                    </pre>
                </Box>
            </Fade>
        </Modal>
    );
}
