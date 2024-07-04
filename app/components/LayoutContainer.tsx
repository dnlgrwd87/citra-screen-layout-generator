'use client';

import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { games } from '../constants';
import { InitialState, Resolution, ScreenData } from '../types';
import { getDefaultScreenData, getInferedResolution, getShareUrl } from '../utils';
import CopyButton from './CopyButton';
import GameSelector from './GameSelector';
import GenerateConfigButton from './GenerageConfigButton';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';

interface Props {
    initialState?: InitialState;
}

export default function LayoutContainer({ initialState }: Props) {
    const defaultResolution = initialState?.resolution || getInferedResolution();
    const defaultScreenData = initialState
        ? {
              top: initialState.topScreen,
              bottom: initialState.bottomScreen,
          }
        : getDefaultScreenData(defaultResolution);

    const [resolution, setResolution] = useState(defaultResolution);
    const [game, setGame] = useState(initialState?.game || games.zelda);
    const [topScreen, setTopScreen] = useState(defaultScreenData.top);
    const [bottomScreen, setBottomScreen] = useState(defaultScreenData.bottom);
    const [shareUrl, setShareUrl] = useState(
        getShareUrl(topScreen, bottomScreen, resolution, game)
    );

    useEffect(() => {
        setShareUrl(getShareUrl(topScreen, bottomScreen, resolution, game));
    }, [topScreen, bottomScreen, resolution, game]);

    const onScreenChange = (
        changeFunc: Dispatch<SetStateAction<ScreenData>>,
        changes: Partial<ScreenData>
    ) => {
        changeFunc((screen) => ({
            ...screen,
            ...changes,
        }));
    };

    const onResolutionChange = (resolution: Resolution) => {
        setResolution(resolution);

        const { top, bottom } = getDefaultScreenData(resolution);

        onScreenChange(setTopScreen, top);
        onScreenChange(setBottomScreen, bottom);
    };

    return (
        <div className="flex">
            <div className="flex flex-col items-center gap-4">
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
                    <GenerateConfigButton
                        className="shrink-0 h-full"
                        topScreen={topScreen}
                        bottomScreen={bottomScreen}
                    />
                    <CopyButton
                        className="shrink-0 h-full"
                        copyText={shareUrl}
                        successMessage="Successfully copied share url"
                    >
                        Copy Share Url
                    </CopyButton>
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
                        screenData={topScreen}
                        onChange={(changes) => onScreenChange(setTopScreen, changes)}
                    />

                    <Screen
                        imageSrc={game.bottomImgSrc}
                        screenData={bottomScreen}
                        onChange={(changes) => onScreenChange(setBottomScreen, changes)}
                    />
                </Box>
            </div>
        </div>
    );
}
