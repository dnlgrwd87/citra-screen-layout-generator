'use client';

import InvalidLayout from './components/InvalidLayout';
import LayoutContainer from './components/LayoutContainer';
import { ResolutionProvider } from './contexts/resolutionContext';
import useMounted from './hooks/useMounted';
import { getDefaultResolution, getInitialStateFromParams } from './utils';

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
        const defaultResolution = initialState?.resolution || getDefaultResolution();

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
