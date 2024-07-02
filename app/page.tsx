'use client';

import { Box, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import ConfigValuesModal from './components/ConfigValuesModal';
import GameSelector from './components/GameSelector';
import ResolutionSelector from './components/ResolutionSelector';
import Screen from './components/Screen';
import { games, resolutions } from './constants';
import { Game, Resolution } from './types';

export default function Home() {
    const [game, setGame] = useState(games.zelda);
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

    const onGameChange = (game: Game) => {
        setGame(game);
    };

    return (
        <main className="flex justify-center p-8">
            <ConfigValuesModal
                topScreen={topScreen}
                bottomScreen={bottomScreen}
                open={showConfigValuesModal}
                onClose={() => setShowConfigValuesModal(false)}
            />
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-5">
                    <div className="min-w-60">
                        <ResolutionSelector onChange={onResolutionChange} />
                    </div>
                    <div className="min-w-60">
                        <GameSelector onChange={onGameChange} />
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
                        imageSrc={game.topImgSrc}
                        resolution={resolution}
                        default={resolution.defaultScreenData.top}
                    />

                    <Screen
                        screenRef={bottomScreen}
                        imageSrc={game.bottomImgSrc}
                        resolution={resolution}
                        default={resolution.defaultScreenData.bottom}
                    />
                </Box>
            </div>
        </main>
    );
}
