'use client';

import { Box, Button } from '@mui/material';
import { RefObject, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Resolution, resolutions } from '../constants';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';

export default function ScreensContainer() {
    const [resolution, setResolution] = useState(resolutions._1920x1080);

    const topScreen = useRef<Rnd>(null);
    const bottomScreen = useRef<Rnd>(null);
    const screensContainer = useRef<HTMLDivElement>(null);

    const containerDimensions = {
        // For display purposes, we want to half the size of the resolution
        width: resolution.width / 2,
        aspectRatio: resolution.aspectRatio,
    };

    const getScreenPositionData = (screen: RefObject<Rnd>) => {
        const screenEl = screen.current?.getSelfElement();
        if (!screenEl || !screensContainer.current) {
            return;
        }

        let screenDims = screenEl.getBoundingClientRect();
        let containerDims = screensContainer.current.getBoundingClientRect();

        const top = screenDims.top - containerDims.top;
        const bottom = top + screenDims.height;
        const left = screenDims.left - containerDims.left;
        const right = left + screenDims.width;

        // multiply all the values by 2 since we halved them earlier
        return {
            top: top * 2,
            bottom: bottom * 2,
            left: left * 2,
            right: right * 2,
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
            <div className="flex self-end items-center gap-5">
                <div className="w-64">
                    <ResolutionSelector onChange={onResolutionChange} />
                </div>
                <Button className="shrink-0 h-full" onClick={onClick}>
                    Get config values
                </Button>
            </div>
            <Box ref={screensContainer} sx={containerDimensions} className="bg-black relative">
                {/* Top Screen - 5:3 aspect ratio */}
                <Screen
                    screenRef={topScreen}
                    imageSrc="/images/top-screen-pkmn.png"
                    default={
                        resolution.defaultScreenData?.top || {
                            x: 0,
                            y: 0,
                            width: 700,
                            height: 420,
                        }
                    }
                />

                {/* Bottom Screen - 4:3 aspect ratio */}
                <Screen
                    screenRef={bottomScreen}
                    imageSrc="/images/bottom-screen-pkmn.png"
                    default={
                        resolution.defaultScreenData?.bottom || {
                            x: 0,
                            y: 0,
                            width: 200,
                            height: 150,
                        }
                    }
                />
            </Box>
        </div>
    );
}
