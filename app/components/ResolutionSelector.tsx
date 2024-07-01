import { FormControl, InputLabel, Select, MenuItem, Menu } from '@mui/material';
import { Resolution, resolutions } from '../constants';
import { useState } from 'react';

interface Props {
    defaultResolution?: Resolution;
    onChange: (resolution: Resolution) => void;
}

export default function ResolutionSelector(props: Props) {
    const [resolution, setResolution] = useState(props.defaultResolution || resolutions._1920x1080);

    const handleChange = (e: any) => {
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
                onChange={handleChange}
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
