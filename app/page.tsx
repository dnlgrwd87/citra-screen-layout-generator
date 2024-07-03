'use client';

import { Box, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import ConfigValuesModal from './components/ConfigValuesModal';
import GameSelector from './components/GameSelector';
import ResolutionSelector from './components/ResolutionSelector';
import Screen from './components/Screen';
import { games, resolutions } from './constants';
import { Game, GameKey, Resolution, ResolutionKey } from './types';
import { getShareUrl, updateScreenSizeAndPosition } from './utils/screenUtils';

export default function Home() {
    const searchParams = useSearchParams();

    const gameId = (searchParams.get('game') || games.zelda.id) as GameKey;
    const resolutionId = (searchParams.get('resolution') ||
        resolutions._1920x1080.id) as ResolutionKey;

    const [game, setGame] = useState<Game>(games[gameId]);
    const [resolution, setResolution] = useState<Resolution>(resolutions[resolutionId]);
    const [showConfigValuesModal, setShowConfigValuesModal] = useState(false);

    const [screensInitiated, setScreensInitiated] = useState(!searchParams.size);

    const topScreen = useRef<Rnd>(null);
    const bottomScreen = useRef<Rnd>(null);

    const onResolutionChange = (resolution: Resolution) => {
        setResolution(resolution);

        updateScreenSizeAndPosition(topScreen.current!, resolution.defaultScreenData.top);
        updateScreenSizeAndPosition(bottomScreen.current!, resolution.defaultScreenData.bottom);
    };

    useEffect(() => {
        if (screensInitiated) {
            return;
        }

        setScreensInitiated(true);

        topScreen.current!.updatePosition({
            x: +searchParams.get('topX'),
            y: +searchParams.get('topY'),
        });
        topScreen.current!.updateSize({
            width: +searchParams.get('topWidth'),
            height: +searchParams.get('topHeight'),
        });
        bottomScreen.current!.updatePosition({
            x: +searchParams.get('bottomX'),
            y: +searchParams.get('bottomY'),
        });
        bottomScreen.current!.updateSize({
            width: +searchParams.get('bottomWidth'),
            height: +searchParams.get('bottomHeight'),
        });
    }, [topScreen.current, bottomScreen.current]);

    const displayClass = !screensInitiated ? 'hidden' : 'flex';

    return (
        <main className={`justify-center p-8 ${displayClass}`}>
            <ConfigValuesModal
                topScreen={topScreen}
                bottomScreen={bottomScreen}
                open={showConfigValuesModal}
                onClose={() => setShowConfigValuesModal(false)}
            />
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={() => {
                        const url = getShareUrl(
                            topScreen.current!,
                            bottomScreen.current!,
                            resolution,
                            game
                        );

                        console.log(url);
                    }}
                >
                    Get share url
                </button>
                <div className="flex items-center justify-center gap-5">
                    <div className="min-w-60">
                        <ResolutionSelector
                            defaultResolution={resolution}
                            onChange={onResolutionChange}
                        />
                    </div>
                    <div className="min-w-60">
                        <GameSelector defaultGame={game} onChange={setGame} />
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
