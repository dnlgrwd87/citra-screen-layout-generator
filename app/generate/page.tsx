'use client';

import useMounted from '../hooks/useMounted';
import { getInitialStateFromParams } from '../utils';
import InvalidLayout from './components/InvalidLayout';
import LayoutContainer from './components/LayoutContainer';
import { ResolutionProvider } from './contexts/resolutionContext';

interface Props {
    searchParams: {
        id?: string;
    };
}

export default function Generate({ searchParams }: Props) {
    const { mounted } = useMounted();


    if (!mounted) {
        return null;
    }

    try {
        const initialState = getInitialStateFromParams(searchParams);
        console.log('initial state', initialState);

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
