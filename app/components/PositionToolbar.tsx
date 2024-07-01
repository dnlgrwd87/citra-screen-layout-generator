import { Button } from '@mui/material';
import { RefObject } from 'react';
import { Rnd } from 'react-rnd';
import { Resolution } from '../types';

interface Props {
    topScreen: RefObject<Rnd>;
    bottomScreen: RefObject<Rnd>;
    resolution: Resolution;
}

export default function PositionToolbar({ topScreen, bottomScreen, resolution }: Props) {
    const onHorizontalCenter = (screen: RefObject<Rnd>) => {
        const screenEl = screen.current?.getSelfElement();

        if (!screenEl) {
            return;
        }

        const rect = screenEl.getBoundingClientRect();

        screen.current?.updatePosition({
            x: (resolution.width / resolution.displayScale - rect.width) / 2,
            y: screen.current?.draggable.state.y,
        });
    };

    const onVerticalCenter = (screen: RefObject<Rnd>) => {
        const screenEl = screen.current?.getSelfElement();

        if (!screenEl) {
            return;
        }

        const rect = screenEl.getBoundingClientRect();

        screen.current?.updatePosition({
            x: screen.current?.draggable.state.x,
            y: (resolution.height / 2 - rect.height) / 2,
        });
    };

    return (
        <div className="flex gap-3">
            <Button color="primary" onClick={() => onHorizontalCenter(topScreen)}>
                Top X
            </Button>
            <Button color="primary" onClick={() => onVerticalCenter(topScreen)}>
                Top Y
            </Button>
            <Button color="primary" onClick={() => onHorizontalCenter(bottomScreen)}>
                Bottom X
            </Button>
            <Button color="primary" onClick={() => onVerticalCenter(bottomScreen)}>
                Bottom Y
            </Button>
        </div>
    );
}
