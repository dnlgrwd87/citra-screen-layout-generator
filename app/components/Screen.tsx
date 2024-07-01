import { Menu, MenuItem } from '@mui/material';
import React, { RefObject } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';
import { Resolution } from '../types';

interface Props extends RndProps {
    screenRef: RefObject<Rnd>;
    resolution: Resolution;
    imageSrc: string;
}

export default function Screen(props: Props) {
    const { screenRef, imageSrc, resolution, ...rndProps } = props;
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                  }
                : null
        );
    };

    const onMenuClose = () => {
        setContextMenu(null);
    };

    const getScreenData = () => {
        return screenRef.current!.getSelfElement()!.getBoundingClientRect();
    };

    const onCenterX = () => {
        const rect = getScreenData();

        screenRef.current!.updatePosition({
            x: (resolution.width / resolution.displayScale - rect.width) / 2,
            y: screenRef.current?.draggable.state.y,
        });

        onMenuClose();
    };

    const onCenterY = () => {
        const rect = getScreenData();

        screenRef.current!.updatePosition({
            x: screenRef.current?.draggable.state.x,
            y: (resolution.height / 2 - rect.height) / 2,
        });

        onMenuClose();
    };

    return (
        <Rnd ref={screenRef} lockAspectRatio bounds="parent" {...rndProps}>
            <div
                className="w-full h-full"
                onContextMenu={handleContextMenu}
                style={{ cursor: 'move' }}
            >
                <img src={imageSrc} className="w-full h-full pointer-events-none" />
                <Menu
                    open={contextMenu !== null}
                    onClose={onMenuClose}
                    anchorReference="anchorPosition"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={onCenterX}>Center X-Axis</MenuItem>
                    <MenuItem onClick={onCenterY}>Center Y-Axis</MenuItem>
                </Menu>
            </div>
        </Rnd>
    );
}
