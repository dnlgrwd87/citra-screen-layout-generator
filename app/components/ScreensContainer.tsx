'use client';

import { Box, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { resolutions } from '../constants';
import { Resolution } from '../types';
import ConfigValuesModal from './ConfigValuesModal';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';

export default function ScreensContainer() {
    const [resolution, setResolution] = useState(resolutions._1920x1080);
    const [showConfigValuesModal, setShowConfigValuesModal] = useState(false);

    const topScreen = useRef<Rnd>(null);
    const bottomScreen = useRef<Rnd>(null);
    const screensContainer = useRef<HTMLDivElement>(null);

    const onResolutionChange = (resolution: Resolution) => {
        setResolution(resolution);

        if (resolution.defaultScreenData) {
            topScreen.current!.updateSize({
                width: resolution.defaultScreenData.top.width,
                height: resolution.defaultScreenData.top.height,
            });
            topScreen.current!.updatePosition({
                x: resolution.defaultScreenData.top.x,
                y: resolution.defaultScreenData.top.y,
            });
            bottomScreen.current!.updateSize({
                width: resolution.defaultScreenData.bottom.width,
                height: resolution.defaultScreenData.bottom.height,
            });
            bottomScreen.current!.updatePosition({
                x: resolution.defaultScreenData.bottom.x,
                y: resolution.defaultScreenData.bottom.y,
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <ConfigValuesModal
                topScreen={topScreen}
                bottomScreen={bottomScreen}
                open={showConfigValuesModal}
                onClose={() => setShowConfigValuesModal(false)}
            />
            <div className="flex justify-end">
                <div className="flex items-center gap-5">
                    <div className="w-64">
                        <ResolutionSelector onChange={onResolutionChange} />
                    </div>
                    <Button
                        className="shrink-0 h-full"
                        onClick={() => setShowConfigValuesModal(true)}
                    >
                        Generate Config
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
                <Screen
                    screenRef={topScreen}
                    imageSrc="/images/top-screen-pkmn.png"
                    resolution={resolution}
                    default={resolution.defaultScreenData.top}
                />

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
