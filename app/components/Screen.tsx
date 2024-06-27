'use client';

import { useState } from 'react';
import { Rnd } from 'react-rnd';

import styles from './screen.module.scss';

export default function Screen() {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const onResize = (e, direction, ref, delta, position) => {
        setWidth(ref.offsetWidth);
        setHeight(ref.offsetHeight);
    };

    const onDragStop = (e, d) => {
        setX(d.x);
        setY(d.y);
    };

    return (
        <Rnd
            className={styles.screen}
            bounds="parent"
            size={{ width, height }}
            onDragStop={onDragStop}
            onResize={onResize}
        >
            <p className="screen">Width: {width}</p>
            <p>Height: {height}</p>
            <p>X: {x}</p>
            <p>Y: {y}</p>
        </Rnd>
    );
}
