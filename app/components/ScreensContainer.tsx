'use client';

import { Box, Button } from '@mui/material';
import { RefObject, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { resolutions } from '../constants';
import { Resolution } from '../types';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';

export default function ScreensContainer() {
    const [resolution, setResolution] = useState(resolutions._1920x1080);

    const topScreen = useRef<Rnd>(null);
    const bottomScreen = useRef<Rnd>(null);
    const screensContainer = useRef<HTMLDivElement>(null);

    const getScreenPositionData = (screen: RefObject<Rnd>) => {
        const screenEl = screen.current?.getSelfElement();
        if (!screenEl || !screensContainer.current) {
            return;
        }

        let { width, height } = screenEl.getBoundingClientRect();
        // todo: type this
        const { x, y } = screen.current?.draggable.state;

        const top = x;
        const bottom = y + height;
        const left = y;
        const right = x + width;

        console.log({ x, y, width, height });

        return {
            top: top * resolution.displayScale,
            bottom: bottom * resolution.displayScale,
            left: left * resolution.displayScale,
            right: right * resolution.displayScale,
        };
    };

    const onClick = () => {
        const data = {
            topScreen: getScreenPositionData(topScreen),
            bottomScreen: getScreenPositionData(bottomScreen),
        };

        alert(JSON.stringify(data, null, 2));
    };

    const onResolutionChange = (resolution: Resolution) => {
        setResolution(resolution);

        if (resolution.defaultScreenData) {
            topScreen.current?.updateSize({
                width: resolution.defaultScreenData.top.width,
                height: resolution.defaultScreenData.top.height,
            });
            topScreen.current?.updatePosition({
                x: resolution.defaultScreenData.top.x,
                y: resolution.defaultScreenData.top.y,
            });
            bottomScreen.current?.updateSize({
                width: resolution.defaultScreenData.bottom.width,
                height: resolution.defaultScreenData.bottom.height,
            });
            bottomScreen.current?.updatePosition({
                x: resolution.defaultScreenData.bottom.x,
                y: resolution.defaultScreenData.bottom.y,
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <div className="flex items-center gap-5">
                    <div className="w-64">
                        <ResolutionSelector onChange={onResolutionChange} />
                    </div>
                    <Button className="shrink-0 h-full" onClick={onClick}>
                        Get config values
                    </Button>
                </div>
            </div>
            <Box
                ref={screensContainer}
                sx={{
                    width: resolution.width / resolution.displayScale,
                    aspectRatio: resolution.aspectRatio,
                }}
                className="bg-black relative"
            >
                {/* Top Screen - 5:3 aspect ratio */}
                <Screen
                    screenRef={topScreen}
                    imageSrc="/images/top-screen-pkmn.png"
                    resolution={resolution}
                    default={resolution.defaultScreenData.top}
                />

                {/* Bottom Screen - 4:3 aspect ratio */}
                <Screen
                    screenRef={bottomScreen}
                    imageSrc="/images/bottom-screen-pkmn.png"
                    resolution={resolution}
                    default={resolution.defaultScreenData.bottom}
                />
            </Box>
        </div>
    );
}
