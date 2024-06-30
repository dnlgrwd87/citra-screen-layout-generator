'use client';

import { RefObject, useRef, useState } from 'react';
import Screen from './Screen';
import { Box } from '@mui/material';

export type Dimensions = {
    width: number;
    height: number;
};

export default function ScreensContainer() {
    const [dimensions, setDimensions] = useState<Dimensions>({
        // steam deck, need a set of defaults
        width: 1200,
        height: 800,
    });

    const topScreen = useRef<HTMLDivElement>(null);
    const bottomScreen = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const style = {
        width: dimensions.width,
        aspectRatio: '16 / 9', // steam deck is 16 / 10
        border: '1px solid black',
    };

    const getScreenPositionData = (screen: RefObject<HTMLDivElement>) => {
        if (!screen.current || !container.current) {
            return;
        }

        let screenDims = screen.current.getBoundingClientRect();
        let containerDims = container.current.getBoundingClientRect();

        const top = screenDims.top - containerDims.top;
        const bottom = top + screenDims.height;
        const left = screenDims.left - containerDims.left;
        const right = left + screenDims.width;

        return { top, bottom, left, right };
    };

    const onClick = () => {
        const data = {
            topScreen: getScreenPositionData(topScreen),
            bottomScreen: getScreenPositionData(bottomScreen),
        };

        alert(JSON.stringify(data, null, 2));
    };

    return (
        <div className="flex flex-col gap-4">
            <button onClick={onClick}>Click me</button>
            <Box ref={container} sx={style}>
                {/* Top Screen - 5:3 aspect ratio */}
                <Screen
                    screenRef={topScreen}
                    default={{
                        x: 0,
                        y: 0,
                        width: 500,
                        height: 300,
                    }}
                />

                {/* Bottom Screen - 4:3 aspect ratio */}
                <Screen
                    screenRef={bottomScreen}
                    default={{
                        x: 0,
                        y: 0,
                        width: 200,
                        height: 150,
                    }}
                />
            </Box>
        </div>
    );
}
