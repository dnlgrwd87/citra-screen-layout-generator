import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { resolutions } from '../constants';
import { Resolution, ResolutionKey } from '../types';

interface Props {
    defaultResolution?: Resolution;
    onChange: (resolution: Resolution) => void;
}

export default function ResolutionSelector(props: Props) {
    const [resolution, setResolution] = useState(props.defaultResolution || resolutions._1920x1080);

    const onResolutionChange = (e: SelectChangeEvent) => {
        const resolution = resolutions[e.target.value as ResolutionKey];
        
        setResolution(resolution);
        props.onChange(resolution);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="resolution-select-label">Resolution</InputLabel>
            <Select
                label="Resolution"
                labelId="resolution-select-label"
                id="resolution-select"
                value={resolution.id}
                onChange={onResolutionChange}
            >
                {Object.values(resolutions).map((resolution) => (
                    <MenuItem key={resolution.id} value={resolution.id}>
                        {resolution.displayName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
