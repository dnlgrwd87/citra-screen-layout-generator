'use client';

import { useState } from 'react';
import Screen from './Screen';
// import styles from './screens-container.module.scss';

export type Dimensions = {
    width: number;
    height: number;
};

export default function ScreensContainer() {
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 1920,
        height: 1080,
    });

    const style = {
        width: dimensions.width,
        'aspect-ratio': '16 / 9', // steam deck is 16 / 10
        border: '1px solid black',
    };

    return (
        <div className="flex" style={style}>
            {/* Top Screen - 5:3 aspect ratio */}
            <Screen
                defaultDims={{
                    width: 500,
                    height: 300,
                }}
                defaultPos={{
                    x: 0,
                    y: 0,
                }}
            />

            {/* Bottom Screen - 4:3 aspect ratio */}
            <Screen
                defaultDims={{
                    width: 200,
                    height: 150,
                }}
                defaultPos={{
                    x: 0,
                    y: 0,
                }}
            />
        </div>
    );
}
