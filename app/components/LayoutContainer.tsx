'use client';

import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import { DISPLAY_SCALE, GAMES } from '../constants';
import { InitialState, Resolution, ScreenData } from '../types';
import { getDefaultScreenData, getInferedResolution, getShareUrl } from '../utils';
import CopyButton from './CopyButton';
import CustomResolution from './CustomResolution';
import GameSelector from './GameSelector';
import GenerateConfigButton from './GenerageConfigButton';
import Screen from './Screen';

interface Props {
    initialState?: InitialState;
}

export default function LayoutContainer({ initialState }: Props) {
    const defaultResolution = useRef(initialState?.resolution || getInferedResolution());
    const defaultScreenData = useRef(
        initialState
            ? {
                  top: initialState.topScreen,
                  bottom: initialState.bottomScreen,
              }
            : getDefaultScreenData(defaultResolution.current)
    );

    const [topScreen, setTopScreen] = useState(defaultScreenData.current.top);
    const [bottomScreen, setBottomScreen] = useState(defaultScreenData.current.bottom);
    const [resolution, setResolution] = useState(defaultResolution.current);
    const [game, setGame] = useState(initialState?.game || GAMES.zelda);

    const shareUrl = useMemo(
        () => getShareUrl(topScreen, bottomScreen, resolution, game),
        [topScreen, bottomScreen, resolution, game]
    );

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
        const { top, bottom } = getDefaultScreenData(resolution);

        setResolution(resolution);
        onScreenChange(setTopScreen, top);
        onScreenChange(setBottomScreen, bottom);
    };

    return (
        <div className="flex">
            <div className="flex flex-col items-center gap-8">
                <div className="min-w-60">
                    <CustomResolution
                        defaultResolution={resolution}
                        onChange={onResolutionChange}
                    />
                </div>
                <div className="flex items-center justify-center gap-5">
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
                        width: resolution.width * DISPLAY_SCALE,
                        height: resolution.height * DISPLAY_SCALE,
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
