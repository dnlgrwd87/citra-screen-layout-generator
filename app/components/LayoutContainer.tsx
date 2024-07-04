'use client';

import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InitialState, Resolution, ScreenData } from '../types';
import { getShareUrl } from '../utils/screenUtils';
import ConfigValues from './ConvigValues';
import CopyButton from './CopyButton';
import Modal from './CustomModal';
import GameSelector from './GameSelector';
import GenerateConfigButton from './GenerageConfigButton';
import ResolutionSelector from './ResolutionSelector';
import Screen from './Screen';

interface Props {
    initialState: InitialState;
}

export default function LayoutContainer({ initialState }: Props) {
    const [game, setGame] = useState(initialState.game);
    const [resolution, setResolution] = useState(initialState.resolution);
    const [showConfigValuesModal, setShowConfigValuesModal] = useState(false);
    const [topScreen, setTopScreen] = useState(initialState.topScreen);
    const [bottomScreen, setBottomScreen] = useState(initialState.bottomScreen);
    const [shareUrl, setShareUrl] = useState('');

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
        onScreenChange(setTopScreen, resolution.defaultScreenData.top);
        onScreenChange(setBottomScreen, resolution.defaultScreenData.bottom);
    };

    return (
        <div className="flex">
            <Modal
                open={showConfigValuesModal}
                onClose={() => setShowConfigValuesModal(false)}
                contentStyles={{
                    paddingTop: '20px',
                }}
            >
                <ConfigValues topScreen={topScreen} bottomScreen={bottomScreen} />
            </Modal>

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
