import React, { createContext, useContext, useState } from 'react';
import { Resolution } from '../types';

export const ResolutionContext = createContext<{
    resolution: Resolution;
    setResolution: (res: Resolution) => void;
}>({
    resolution: { width: 0, height: 0 },
    setResolution: () => {},
});

export const useResolutionContext = () => useContext(ResolutionContext);

interface Props {
    children: React.ReactNode;
    defaultResolution: Resolution;
}

export const ResolutionProvider: React.FC<Props> = ({ children, defaultResolution }) => {
    const [resolution, setResolution] = useState(defaultResolution);

    return (
        <ResolutionContext.Provider value={{ resolution, setResolution }}>
            {children}
        </ResolutionContext.Provider>
    );
};
