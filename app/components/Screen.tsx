import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import React, { RefObject } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

interface Props extends RndProps {
    screenRef: RefObject<Rnd>;
    imageSrc: string;
}

export default function Screen(props: Props) {
    const { imageSrc, screenRef, ...rndProps } = props;
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

    const onCenterX = () => {
        const screen = screenRef.current!;
        const screenEl = screen.getSelfElement()!;

        screen.updatePosition({
            x: (screen.getParentSize().width - screenEl.offsetWidth) / 2,
            y: screen.getDraggablePosition().y,
        });

        onMenuClose();
    };

    const onCenterY = () => {
        const screen = screenRef.current!;
        const screenEl = screen.getSelfElement()!;

        screen.updatePosition({
            x: screen.getDraggablePosition().x,
            y: (screen.getParentSize().height - screenEl.offsetHeight) / 2,
        });

        onMenuClose();
    };

    return (
        <Rnd ref={screenRef} lockAspectRatio bounds="parent" {...rndProps}>
            <div
                className="w-full h-full relative"
                onContextMenu={handleContextMenu}
                style={{ cursor: 'move' }}
            >
                <Image
                    fill
                    priority
                    sizes="100vh"
                    src={imageSrc}
                    className="w-full h-full pointer-events-none"
                    alt="screen-image"
                />
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
