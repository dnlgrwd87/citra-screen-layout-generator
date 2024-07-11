import React, { createContext, useContext, useRef, useState } from 'react';
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
    // Get the device pixel ratio for the user's screen.
    // This is could be 1, or it could be more for high density pixel displays.
    // Rounding to the nearest 0.5 is a decent guess.
    // We put it in a ref because it doesn't matter if it changes after the initial load.
    const devicePixelRatio = useRef(Math.round(window.devicePixelRatio * 2) / 2).current;

    // We want the layout container to be smaller than the user's screen.
    const displayScale = (1 / devicePixelRatio) * 0.65;

    const [resolution, setResolution] = useState(
        defaultResolution || {
            width: window.screen.width * devicePixelRatio,
            height: window.screen.height * devicePixelRatio,
        }
    );

    return (
        <ResolutionContext.Provider value={{ resolution, setResolution, displayScale }}>
            {children}
        </ResolutionContext.Provider>
    );
};
