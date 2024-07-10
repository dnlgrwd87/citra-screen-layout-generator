'use client';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import CopyButton from '../../components/CopyButton';
import { ScreenData } from '../../types';
import { getDisplayValues } from '../../utils';

interface Props {
    topScreen: ScreenData;
    bottomScreen: ScreenData;
}

type DisplayType = 'config' | 'human';

export default function ScreenDisplayValues({ topScreen, bottomScreen }: Props) {
    const getValues = (): string[] => {
        const top = getDisplayValues(topScreen);
        const bottom = getDisplayValues(bottomScreen);

        return [
            `Top X Position: ${top.x}px`,
            `Top Y Position: ${top.y}px`,
            `Top Width: ${top.width}px`,
            `Top Height: ${top.height}px`,
            `Bottom X Position: ${bottom.x}px`,
            `Bottom Y Position: ${bottom.y}px`,
            `Bottom Width: ${bottom.width}px`,
            `Bottom Height: ${bottom.height}px`,
        ];
    };

    const getConfigValues = (): string[] => {
        const top = getDisplayValues(topScreen);
        const bottom = getDisplayValues(bottomScreen);

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

    const [displayType, setDisplayType] = useState<DisplayType>('config');
    const [displayValues, setDisplayValues] = useState(getConfigValues());

    const onDisplayTypeChange = (_: React.MouseEvent<HTMLElement>, displayType: DisplayType) => {
        setDisplayType(displayType);
        setDisplayValues(displayType === 'config' ? getConfigValues() : getValues());
    };

    return (
        <div className="flex flex-col gap-8 text-sm pt-4 min-w-96">
            <ToggleButtonGroup
                color="primary"
                value={displayType}
                exclusive
                onChange={onDisplayTypeChange}
                aria-label="Display Type"
                sx={{
                    height: 35,
                }}
            >
                <ToggleButton value="config">Config</ToggleButton>
                <ToggleButton value="human">Human Readable</ToggleButton>
            </ToggleButtonGroup>
            <pre className="bg-gray-200 p-7 rounded-md shadow-md">
                {displayValues.map((val) => (
                    <p key={val}>{val}</p>
                ))}
            </pre>
            <CopyButton
                sx={{
                    alignSelf: 'center',
                    width: '60%',
                }}
                copyText={displayValues.join('\n')}
                successMessage="Successfully copied values"
            >
                Copy Values
            </CopyButton>
        </div>
    );
}
