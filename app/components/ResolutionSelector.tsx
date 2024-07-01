import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { resolutions } from '../constants';
import { Resolution } from '../types';

interface Props {
    defaultResolution?: Resolution;
    onChange: (resolution: Resolution) => void;
}

export default function ResolutionSelector(props: Props) {
    const [resolution, setResolution] = useState(props.defaultResolution || resolutions._1920x1080);

    const onResolutionChange = (e: SelectChangeEvent) => {
        const resolution = resolutions[e.target.value];
        
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
                {Object.keys(resolutions).map((k) => (
                    <MenuItem key={k} value={resolutions[k].id}>
                        {resolutions[k].displayName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
