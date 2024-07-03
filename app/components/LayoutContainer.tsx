'use client';

import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { InitialState } from '../types';
import GameSelector from './GameSelector';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';
import ConfigValuesModal from './ConfigValuesModal';
import { getShareUrl } from '../utils/screenUtils';

interface Props {
    initialState: InitialState;
}

export default function LayoutContainer({ initialState }: Props) {
    const [game, setGame] = useState(initialState.game);
    const [resolution, setResolution] = useState(initialState.resolution);
    const [showConfigValuesModal, setShowConfigValuesModal] = useState(false);

    const [topScreen, setTopScreen] = useState(initialState.defaultTop);
    const [bottomScreen, setBottomScreen] = useState(initialState.defaultBottom);

    return (
        <div className="flex">
            <ConfigValuesModal
                topScreen={topScreen}
                bottomScreen={bottomScreen}
                open={showConfigValuesModal}
                onClose={() => setShowConfigValuesModal(false)}
            />
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={() => {
                        const url = getShareUrl(topScreen, bottomScreen, resolution, game);

                        console.log(url);
                    }}
                >
                    Get share url
                </button>
                <div className="flex items-center justify-center gap-5">
                    <div className="min-w-60">
                        <ResolutionSelector
                            defaultResolution={resolution}
                            onChange={setResolution}
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
                        imageSrc={game.topImgSrc}
                        resolution={resolution}
                        default={initialState.defaultTop}
                        location="top"
                        onChange={(changes) => {
                            setTopScreen((topScreen) => ({
                                ...topScreen,
                                ...changes,
                            }));
                        }}
                    />

                    <Screen
                        imageSrc={game.bottomImgSrc}
                        resolution={resolution}
                        default={initialState.defaultBottom}
                        location="bottom"
                        onChange={(changes) => {
                            setBottomScreen((bottomScreen) => ({
                                ...bottomScreen,
                                ...changes,
                            }));
                        }}
                    />
                </Box>
            </div>
        </div>
    );
}
