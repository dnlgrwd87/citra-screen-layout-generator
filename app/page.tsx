'use client';

import InvalidLayout from './components/InvalidLayout';
import LayoutContainer from './components/LayoutContainer';
import { DEVICE_PIXEL_RATIO } from './constants';
import { ResolutionProvider } from './contexts/resolutionContext';
import useMounted from './hooks/useMounted';
import { getInitialStateFromParams } from './utils';

interface Props {
    searchParams: {
        id?: string;
    };
}

export default function Home({ searchParams }: Props) {
    const { mounted } = useMounted();

    if (!mounted) {
        return null;
    }

    try {
        const initialState = getInitialStateFromParams(searchParams);
        const defaultResolution = initialState?.resolution || {
            width: window.screen.width * DEVICE_PIXEL_RATIO,
            height: window.screen.height * DEVICE_PIXEL_RATIO,
        };

        return (
            <ResolutionProvider defaultResolution={defaultResolution}>
                <div className="flex justify-center">
                    <LayoutContainer initialState={initialState} />
                </div>
            </ResolutionProvider>
        );
    } catch (e) {
        return <InvalidLayout />;
    }
}
