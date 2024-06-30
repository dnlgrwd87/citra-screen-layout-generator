'use client';

import { Box, Button } from '@mui/material';
import { RefObject, useEffect, useRef, useState } from 'react';
import Screen from './Screen';

export type Dimensions = {
    width: number;
    height: number;
};

export default function ScreensContainer() {
    // The two screen components need the container to be mounted before they are so they can set the
    // bounds correctly. If we don't wait, the two screens see the window as their parent at first, then
    // jump into the bounds of the container when rendered.
    const [mounted, setMounted] = useState(false);

    const [dimensions, setDimensions] = useState<Dimensions>({
        // steam deck, need a set of defaults
        width: 1280,
        height: 800,
    });

    const topScreen = useRef<HTMLImageElement>(null);
    const bottomScreen = useRef<HTMLImageElement>(null);
    const screensContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const containerDimensions = {
        width: dimensions.width,
        aspectRatio: '16 / 10', // steam deck is 16 / 10
    };

    const getScreenPositionData = (screen: RefObject<HTMLDivElement>) => {
        if (!screen.current || !screensContainer.current) {
            return;
        }

        let screenDims = screen.current.getBoundingClientRect();
        let containerDims = screensContainer.current.getBoundingClientRect();

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

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <Button variant="contained" className="self-end" onClick={onClick}>
                Get config values
            </Button>
            <Box ref={screensContainer} sx={containerDimensions} className="bg-black">
                {/* Top Screen - 5:3 aspect ratio */}
                <Screen
                    screenRef={topScreen}
                    imageSrc="/images/top-screen-pkmn.png"
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
                    imageSrc="/images/top-screen-pkmn.png"
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
