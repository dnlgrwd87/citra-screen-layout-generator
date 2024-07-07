'use client';

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

        // We divide by display scale to get actual values, since we multiplied by it initially.
        // Then we multiply by the device pixel reatio to get the actual resolution.
        return {
            top: (top / DISPLAY_SCALE) * window.devicePixelRatio,
            bottom: (bottom / DISPLAY_SCALE) * window.devicePixelRatio,
            left: (left / DISPLAY_SCALE) * window.devicePixelRatio,
            right: (right / DISPLAY_SCALE) * window.devicePixelRatio,
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
            'custom_layout\\default=false',
            'custom_top_left\\default=false',
            'custom_top_top\\default=false',
            'custom_top_right\\default=false',
            'custom_top_bottom\\default=false',
            'custom_bottom_left\\default=false',
            'custom_bottom_top\\default=false',
            'custom_bottom_right\\default=false',
            'custom_bottom_bottom\\default=false',
        ];
    };

    const copyText = getConfigValues().join('\n');

    return (
        <div className="flex flex-col gap-8 text-sm pt-4">
            <pre className="bg-gray-200 p-7 rounded-md shadow-md">
                {getConfigValues().map((val) => (
                    <p key={val}>{val}</p>
                ))}
            </pre>
            <CopyButton
                sx={{
                    alignSelf: 'center',
                    width: '60%',
                }}
                copyText={copyText}
                successMessage="Successfully copied config values"
            >
                Copy Values
            </CopyButton>
        </div>
    );
}
