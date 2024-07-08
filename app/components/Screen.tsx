import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Rnd, RndDragCallback, Props as RndProps, RndResizeCallback } from 'react-rnd';
import { DISPLAY_SCALE } from '../constants';
import { ScreenData } from '../types';

interface Props extends RndProps {
    imageSrc: string;
    screenData: ScreenData;
    onChange: (data: Partial<ScreenData>) => void;
}

export default function Screen(props: Props) {
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const screen = useRef<Rnd>(null);

    useEffect(() => {
        if (!screen.current) {
            return;
        }

        const { x, y, width, height } = props.screenData;

        screen.current.updatePosition({ x, y });
        screen.current.updateSize({ width, height });
    }, [props.screenData]);

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

    const centerX = (screen: Rnd) => {
        props.onChange({
            x: (screen.getParentSize().width - screen.getSelfElement()!.offsetWidth) / 2,
        });
    };

    const centerY = (screen: Rnd) => {
        props.onChange({
            y: (screen.getParentSize().height - screen.getSelfElement()!.offsetHeight) / 2,
        });
    };

    const onCenter = (centerFunc: (screen: Rnd) => void) => {
        if (!screen.current) {
            return;
        }

        centerFunc(screen.current);

        onMenuClose();
    };

    const onResizeStop: RndResizeCallback = (_e, _direction, ref, _delta, _position) => {
        if (!screen.current) {
            return;
        }

        props.onChange({
            ...screen.current.getDraggablePosition(),
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        });
    };

    const onDragStop: RndDragCallback = (_e, { x, y }) => {
        props.onChange({ x, y });
    };

    const renderDebug = () => {
        const x = props.screenData.x / DISPLAY_SCALE;
        const y = props.screenData.y / DISPLAY_SCALE;
        const width = props.screenData.width / DISPLAY_SCALE;
        const height = props.screenData.height / DISPLAY_SCALE;
        const top = y;
        const bottom = y + height;
        const left = x;
        const right = x + width;

        return (
            <div className="flex flex-col h-full w-full bg-white items-center justify-center border-2 border-green-500">
                <p>
                    x: {x}, y: {y}
                </p>
                <p>
                    {width} x {height}
                </p>
                <p>top: {top}</p>
                <p>bottom: {bottom}</p>
                <p>left: {left}</p>
                <p>right: {right}</p>
            </div>
        );
    };

    const renderScreen = () => {
        if (process.env.NODE_ENV === 'development') {
            return renderDebug();
        }

        return (
            <Image
                fill
                priority
                sizes="100vh"
                src={props.imageSrc}
                className="w-full h-full pointer-events-none"
                alt="screen-image"
            />
        );
    };

    return (
        <Rnd
            ref={screen}
            lockAspectRatio
            bounds="parent"
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            default={props.screenData}
        >
            <div
                className="w-full h-full relative"
                onContextMenu={handleContextMenu}
                style={{ cursor: 'move' }}
            >
                {renderScreen()}
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
                    <MenuItem onClick={() => onCenter(centerX)}>Center X-Axis</MenuItem>
                    <MenuItem onClick={() => onCenter(centerY)}>Center Y-Axis</MenuItem>
                </Menu>
            </div>
        </Rnd>
    );
}
