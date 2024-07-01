import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

interface Props {
    onCenterX: () => void;
    onCenterY: () => void;
}

export default function ScreenPositionButton(props: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const buttonId = 'menu-button';

    const onMenuClose = () => {
        setAnchorEl(null);
    };

    const onCenterX = () => {
        onMenuClose();
        props.onCenterX();
    };

    const onCenterY = () => {
        onMenuClose();
        props.onCenterY();
    };

    return (
        <>
            <Button
                id={buttonId}
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
                sx={{
                    minWidth: 0,
                    padding: 1,
                    lineHeight: 1,
                }}
            >
                ...
            </Button>
            <Menu
                id={buttonId}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={onMenuClose}
                MenuListProps={{
                    'aria-labelledby': buttonId,
                }}
            >
                <MenuItem onClick={onCenterX}>Center X-Axis</MenuItem>
                <MenuItem onClick={onCenterY}>Center Y-Axis</MenuItem>
            </Menu>
        </>
    );
}
