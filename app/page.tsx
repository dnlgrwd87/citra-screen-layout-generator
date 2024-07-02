'use client';

import { Box, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import ConfigValuesModal from './components/ConfigValuesModal';
import ResolutionSelector from './components/ResolutionSelector';
import Screen from './components/Screen';
import { resolutions } from './constants';
import { Resolution } from './types';

export default function Home() {
    const [resolution, setResolution] = useState(resolutions._1920x1080);
    const [showConfigValuesModal, setShowConfigValuesModal] = useState(false);

    const topScreen = useRef<Rnd>(null);
    const bottomScreen = useRef<Rnd>(null);

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
        <main className="flex min-h-screen justify-center p-8">
            <ConfigValuesModal
                topScreen={topScreen}
                bottomScreen={bottomScreen}
                open={showConfigValuesModal}
                onClose={() => setShowConfigValuesModal(false)}
            />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-end gap-5">
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
                <Box
                    className="bg-black relative"
                    sx={{
                        width: resolution.width / resolution.displayScale,
                        aspectRatio: resolution.aspectRatio,
                    }}
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
        </main>
    );
}
