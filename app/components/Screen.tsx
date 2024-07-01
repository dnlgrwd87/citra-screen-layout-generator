import { RefObject, useState } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';
import { Resolution } from '../types';
import ScreenPositionButton from './ScreenPositionButton';

interface Props extends RndProps {
    screenRef: RefObject<Rnd>;
    resolution: Resolution;
    imageSrc: string;
}

export default function Screen(props: Props) {
    const { screenRef, imageSrc, resolution, ...rndProps } = props;
    const [showMenu, setShowMenu] = useState(false);

    const onCenterX = () => {
        const screenEl = screenRef.current?.getSelfElement();

        if (!screenEl) {
            return;
        }

        const rect = screenEl.getBoundingClientRect();

        screenRef.current?.updatePosition({
            x: (resolution.width / resolution.displayScale - rect.width) / 2,
            y: screenRef.current?.draggable.state.y,
        });
    };

    const onCenterY = () => {
        const screenEl = screenRef.current?.getSelfElement();

        if (!screenEl) {
            return;
        }

        const rect = screenEl.getBoundingClientRect();

        screenRef.current?.updatePosition({
            x: screenRef.current?.draggable.state.x,
            y: (resolution.height / 2 - rect.height) / 2,
        });
    };

    return (
        <Rnd ref={screenRef} lockAspectRatio bounds="parent" {...rndProps}>
            <div
                className="w-full h-full"
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                <img src={imageSrc} className="w-full h-full pointer-events-none" />
                {showMenu && (
                    <div className="absolute top-3 right-3">
                        <ScreenPositionButton
                            onCenterX={onCenterX}
                            onCenterY={onCenterY}
                            onMenuClose={() => setShowMenu(false)}
                        />
                    </div>
                )}
            </div>
        </Rnd>
    );
}
