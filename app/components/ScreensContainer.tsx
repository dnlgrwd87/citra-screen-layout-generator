'use client';

import { useState } from 'react';
import { Rnd } from 'react-rnd';

import styles from './screens-container.module.scss';

interface Props {
    topScreen: any;
    bottomScreen: any;
}

export default function ScreensContainer({ topScreen, bottomScreen }: Props) {
    return (
        <div className="flex">
            <div></div>
        </div>
    );
}
