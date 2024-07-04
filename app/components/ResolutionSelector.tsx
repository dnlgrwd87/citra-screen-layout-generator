import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { RESOLUTIONS } from '../constants';
import { Resolution, ResolutionKey } from '../types';

interface Props {
    defaultResolution: Resolution;
    onChange: (resolution: Resolution) => void;
}

export default function ResolutionSelector(props: Props) {
    const [resolution, setResolution] = useState(props.defaultResolution);

    const onResolutionChange = (e: SelectChangeEvent) => {
        const resolution = RESOLUTIONS[e.target.value as ResolutionKey];
        
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
                {Object.values(RESOLUTIONS).map((resolution) => (
                    <MenuItem key={resolution.id} value={resolution.id}>
                        {resolution.displayName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
