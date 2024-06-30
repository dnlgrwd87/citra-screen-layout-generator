'use client';

import { useState } from 'react';
import { ResizableDelta, Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';

import styles from './screen.module.scss';

interface Props {
    defaultPos: {
        x: number;
        y: number;
    };
    defaultDims: {
        width: number;
        height: number;
    };
}

type Direction =
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'topRight'
    | 'bottomRight'
    | 'bottomLeft'
    | 'topLeft';

export default function Screen(props: Props) {
    const [dims, setDims] = useState(props.defaultDims);
    const [pos, setPos] = useState(props.defaultPos);

    const onResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
        setDims({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        });

        updatePosition(direction, delta);
    };

    const updatePosition = (direction: Direction, delta: ResizableDelta) => {
        if (direction === 'topLeft') {
            setPos((pos) => ({
                x: pos.x - delta.width,
                y: pos.y - delta.height,
            }));
        }

        if (direction === 'top' || direction === 'topRight') {
            setPos(pos => ({
                ...pos,
                y: pos.y - delta.height
            }));
        }

        if (direction === 'left' || direction === 'bottomLeft') {
            setPos(pos => ({
                ...pos,
                x: pos.x - delta.width,
            }));
        }
    };

    const onDragStop: RndDragCallback = (e, pos) => {
        setPos(pos);
    };

    const top = pos.y;
    const left = pos.x;
    const right = dims.width + pos.x;
    const bottom = dims.height + pos.y;

    return (
        <Rnd
            className={styles.screen}
            bounds="parent"
            size={dims}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            // lockAspectRatio
        >
            <p>top: {top}</p>
            <p>left: {left}</p>
            <p>bottom: {bottom}</p>
            <p>right: {right}</p>
        </Rnd>
    );
}
