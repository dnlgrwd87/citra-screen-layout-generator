'use client';

import ContentCopy from '@mui/icons-material/ContentCopy';
import { DISPLAY_SCALE } from '../constants';
import { ScreenData } from '../types';
import CopyButton from './CopyButton';

interface Props {
    topScreen: ScreenData;
    bottomScreen: ScreenData;
}

export default function ConfigValues({ topScreen, bottomScreen }: Props) {
    const getScreenData = ({ x, y, width, height }: ScreenData) => {
        const top = y;
        const bottom = y + height;
        const left = x;
        const right = x + width;

        // We divide by display scale to get actual values
        return {
            top: Math.round(top / DISPLAY_SCALE),
            bottom: Math.round(bottom / DISPLAY_SCALE),
            left: Math.round(left / DISPLAY_SCALE),
            right: Math.round(right / DISPLAY_SCALE),
        };
    };

    const getConfigValues = () => {
        const top = getScreenData(topScreen);
        const bottom = getScreenData(bottomScreen);

        return [
            'custom_layout=true',
            `custom_top_top=${top.top}`,
            `custom_top_bottom=${top.bottom}`,
            `custom_top_left=${top.left}`,
            `custom_top_right=${top.right}`,
            `custom_bottom_top=${bottom.top}`,
            `custom_bottom_bottom=${bottom.bottom}`,
            `custom_bottom_left=${bottom.left}`,
            `custom_bottom_right=${bottom.right}`,
        ];
    };

    const copyText = getConfigValues().join('\n');

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>Paste into qt-config.ini</div>
                <CopyButton
                    color="inherit"
                    disableElevation
                    copyText={copyText}
                    successMessage="Successfully copied config values"
                    sx={{
                        minWidth: 0,
                        padding: '0 10px 5px 10px',
                        background: 'white',
                    }}
                >
                    <ContentCopy />
                </CopyButton>
            </div>
            <pre>
                <div className="text-sm l p-5 bg-gray-200 rounded-md shadow-md shadow-slate-300">
                    {getConfigValues().map((val) => (
                        <p key={val}>{val}</p>
                    ))}
                </div>
            </pre>
        </div>
    );
}
