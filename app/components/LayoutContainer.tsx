'use client';

import { Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { games, resolutions } from '../constants';
import { Game, GameKey, Resolution, ResolutionKey, ScreenData, StateFromParams } from '../types';
import { getShareUrl, updateScreenSizeAndPosition } from '../utils/screenUtils';
import ConfigValuesModal from './ConfigValuesModal';
import GameSelector from './GameSelector';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';

interface Props {
    initialState?: StateFromParams;
}

export default function LayoutContainer({ initialState }: Props) {
    const gameId = (initialState?.gameId || games.zelda.id) as GameKey;
    const resolutionId = (initialState?.resolutionId || resolutions._1920x1080.id) as ResolutionKey;

    const [game, setGame] = useState<Game>(games[gameId]);
    const [resolution, setResolution] = useState<Resolution>(resolutions[resolutionId]);
    const [showConfigValuesModal, setShowConfigValuesModal] = useState(false);

    const [screensInitiated, setScreensInitiated] = useState(!initialState);

    const topScreen = useRef<Rnd>(null);
    const bottomScreen = useRef<Rnd>(null);

    const onResolutionChange = (resolution: Resolution) => {
        setResolution(resolution);

        updateScreenSizeAndPosition(topScreen.current!, resolution.defaultScreenData.top);
        updateScreenSizeAndPosition(bottomScreen.current!, resolution.defaultScreenData.bottom);
    };

    useEffect(() => {
        setScreensInitiated(true);

        if (!initialState) {
            return;
        }

        const topScreenData: ScreenData = {
            x: initialState.topX,
            y: initialState.topY,
            width: initialState.topWidth,
            height: initialState.topHeight,
        };

        const bottomScreenData: ScreenData = {
            x: initialState.bottomX,
            y: initialState.bottomY,
            width: initialState.bottomWidth,
            height: initialState.bottomHeight,
        };

        updateScreenSizeAndPosition(topScreen.current!, topScreenData);
        updateScreenSizeAndPosition(bottomScreen.current!, bottomScreenData);
    }, [initialState]);

    const displayClass = !screensInitiated ? 'hidden' : 'flex';

    return (
        <div className={displayClass}>
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
        </div>
    );
}
