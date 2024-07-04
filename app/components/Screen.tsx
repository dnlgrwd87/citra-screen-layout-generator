import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Rnd, RndDragCallback, Props as RndProps, RndResizeCallback } from 'react-rnd';
import { Resolution, ScreenData, ScreenLocation } from '../types';

interface Props extends RndProps {
    imageSrc: string;
    resolution: Resolution;
    location: ScreenLocation;
    onChange: (data: Partial<ScreenData>) => void;
}

export default function Screen(props: Props) {
    const { resolution, location, onChange } = props;

    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const rnd = useRef<Rnd>(null);
    const mounted = useRef(false);

    useEffect(() => {
        if (!rnd.current || !mounted.current) {
            mounted.current = true;

            return;
        }

        const { x, y, width, height } = resolution.defaultScreenData[location];

        rnd.current?.updatePosition({ x, y });
        rnd.current?.updateSize({ width, height });

        onChange({ x, y, width, height });
    }, [resolution, location, onChange]);

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
        const screen = rnd.current!;
        const screenEl = screen.getSelfElement()!;

        const position = {
            x: (screen.getParentSize().width - screenEl.offsetWidth) / 2,
            y: screen.getDraggablePosition().y,
        };

        screen.updatePosition(position);
        props.onChange(position);

        onMenuClose();
    };

    const onCenterY = () => {
        const screen = rnd.current!;
        const screenEl = screen.getSelfElement()!;

        const position = {
            x: screen.getDraggablePosition().x,
            y: (screen.getParentSize().height - screenEl.offsetHeight) / 2,
        };

        screen.updatePosition(position);
        props.onChange(position);

        onMenuClose();
    };

    const onResizeStop: RndResizeCallback = (_e, _direction, ref, _delta, _position) => {
        if (!rnd.current) {
            return;
        }

        props.onChange({
            ...rnd.current.getDraggablePosition(),
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        });
    };

    const onDragStop: RndDragCallback = (_e, { x, y }) => {
        props.onChange({ x, y });
    };

    return (
        <Rnd
            ref={rnd}
            lockAspectRatio
            bounds="parent"
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            default={props.default}
        >
            <div
                className="w-full h-full relative"
                onContextMenu={handleContextMenu}
                style={{ cursor: 'move' }}
            >
                <Image
                    fill
                    priority
                    sizes="100vh"
                    src={props.imageSrc}
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
