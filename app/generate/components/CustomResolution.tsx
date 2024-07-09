import { Alert, Button, FormControl, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import { Resolution } from '../../types';
import ResolutionMenu from './ResolutionMenu';

interface Props {
    defaultResolution: Resolution;
    onChange: (resolution: Resolution) => void;
}

export default function ResolutionSelector(props: Props) {
    const [resolution, setResolution] = useState(props.defaultResolution);
    const [showError, setShowError] = useState(false);

    const onSetResolution = () => {
        const { width, height } = resolution;

        if (width % 2 !== 0 || width < 100 || height % 2 !== 0 || height < 100) {
            setShowError(true);

            return;
        }

        props.onChange(resolution);
    };

    const onResolutionChange = (e: any) => {
        setResolution((resolution) => ({
            ...resolution,
            [e.target.id]: Number(e.target.value),
        }));
    };

    const onCloseSnackBarClose = () => {
        setShowError(false);
    };

    const onPresetResolutionChange = (presetResolution: Resolution) => {
        setResolution(presetResolution);
        props.onChange(presetResolution);
    };

    return (
        <>
            <FormControl fullWidth>
                <div className="flex gap-5">
                    <div>
                        <TextField
                            id="width"
                            label="Width"
                            type="number"
                            sx={{
                                width: 145,
                                '& .MuiInputBase-root': {
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                },
                            }}
                            value={resolution.width}
                            onChange={onResolutionChange}
                        />
                        <TextField
                            id="height"
                            label="Height"
                            type="number"
                            sx={{
                                width: 145,
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={resolution.height}
                            onChange={onResolutionChange}
                        />
                        <Button
                            onClick={onSetResolution}
                            sx={{
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                            }}
                        >
                            Set
                        </Button>
                    </div>
                    <ResolutionMenu onChange={onPresetResolutionChange} />
                </div>
            </FormControl>
            <Snackbar
                open={showError}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                onClose={onCloseSnackBarClose}
            >
                <Alert onClose={onCloseSnackBarClose} severity="error" variant="filled">
                    Width and height must be even and greater than 100
                </Alert>
            </Snackbar>
        </>
    );
}
