'use client';

import { useSearchParams } from 'next/navigation';
import useMounted from '../hooks/useMounted';
import { getInitialStateFromParams } from '../utils';
import InvalidLayout from './components/InvalidLayout';
import LayoutContainer from './components/LayoutContainer';
import { ResolutionProvider } from './contexts/resolutionContext';

export default function Generate() {
    const searchParams = useSearchParams();
    const { mounted } = useMounted();

    if (!mounted) {
        return null;
    }

    try {
        const initialState = getInitialStateFromParams(searchParams);

        return (
            <ResolutionProvider defaultResolution={initialState?.resolution}>
                <div className="flex justify-center">
                    <LayoutContainer initialState={initialState} />
                </div>
            </ResolutionProvider>
        );
    } catch (e) {
        return <InvalidLayout />;
    }
}
