import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { PRESET_RESOLUTIONS } from '../../constants';
import { Resolution } from '../../types';

interface Props {
    onChange: (resolution: Resolution) => void;
}

export default function ResolutionSelector(props: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onMenuClose = () => {
        setAnchorEl(null);
    };

    const onPresetChange = (resolution: Resolution) => {
        props.onChange(resolution);
        onMenuClose();
    };

    return (
        <>
            <Button
                id="customized-button"
                aria-controls={open ? 'customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={onMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Presets
            </Button>
            <Menu
                id="customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'customized-button',
                }}
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={onMenuClose}
            >
                {PRESET_RESOLUTIONS.map((resolution) => (
                    <MenuItem
                        key={resolution.id}
                        value={resolution.id}
                        onClick={() => onPresetChange(resolution)}
                    >
                        {resolution.displayName}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
