import React, { createContext, useContext, useState } from 'react';
import { Resolution } from '../../types';

export const ResolutionContext = createContext<{
    resolution: Resolution;
    setResolution: (res: Resolution) => void;
    displayScale: number;
}>({
    resolution: { width: 0, height: 0 },
    setResolution: () => {},
    displayScale: 1,
});

export const useResolutionContext = () => useContext(ResolutionContext);

interface Props {
    children: React.ReactNode;
    defaultResolution?: Resolution;
}

export const ResolutionProvider: React.FC<Props> = ({ children, defaultResolution }) => {
    // This is could be 1, or it could be more for high density pixel displays.
    // Rounding to the nearest 0.5 is a decent guess.
    // We only care about this value on app start up and it should not change.
    const devicePixelRatio = Math.round(window.devicePixelRatio * 2) / 2;

    const [resolution, setResolution] = useState(
        defaultResolution || {
            width: window.screen.width * devicePixelRatio,
            height: window.screen.height * devicePixelRatio,
        }
    );

    const displayScale = (1 / devicePixelRatio) * 0.65;

    return (
        <ResolutionContext.Provider value={{ resolution, setResolution, displayScale }}>
            {children}
        </ResolutionContext.Provider>
    );
};
