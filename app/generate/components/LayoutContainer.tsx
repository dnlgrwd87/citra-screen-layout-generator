'use client';

import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import CopyButton from '../../components/CopyButton';
import { GAMES } from '../../constants';
import { InitialState, Resolution, ScreenData } from '../../types';
import { getDefaultScreenData, getShareUrl } from '../../utils';
import GameSelector from '../components/GameSelector';
import { useResolutionContext } from '../contexts/resolutionContext';
import GetValuesButton from './GetValuesButton';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';

interface Props {
    initialState: InitialState | null;
}

export default function LayoutContainer({ initialState }: Props) {
    const { resolution, setResolution, displayScale } = useResolutionContext();

    const defaultScreenData = useRef(
        initialState
            ? {
                  top: initialState.topScreen,
                  bottom: initialState.bottomScreen,
              }
            : getDefaultScreenData(resolution)
    );

    const [topScreen, setTopScreen] = useState(defaultScreenData.current.top);
    const [bottomScreen, setBottomScreen] = useState(defaultScreenData.current.bottom);
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
                <div className="flex flex-col gap-8">
                    <div className="min-w-60">
                        <ResolutionSelector
                            defaultResolution={resolution}
                            onChange={onResolutionChange}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-5">
                        <div className="min-w-60">
                            <GameSelector defaultGame={game} onChange={setGame} />
                        </div>
                        <GetValuesButton
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
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center self-center gap-2 text-sm text-gray-700">
                        <TipsAndUpdatesIcon fontSize="small" />
                        Right click a screen for quick actions.
                    </div>

                    <Box
                        sx={{
                            width: resolution.width * displayScale,
                            height: resolution.height * displayScale,
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <Box
                            className="bg-black relative"
                            sx={{
                                transform: `scale(${displayScale})`,
                                transformOrigin: 'top left',
                                position: 'absolute',
                                width: resolution.width,
                                height: resolution.height,
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
                    </Box>
                </div>
            </div>
        </div>
    );
}
