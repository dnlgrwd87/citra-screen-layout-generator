import { Box } from '@mui/material';
import { RefObject } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

interface Props extends RndProps {
    screenRef: RefObject<HTMLDivElement>;
    imageSrc: string;
}

export default function Screen(props: Props) {
    const { screenRef, imageSrc, ...rndProps } = props;

    return (
        <Rnd lockAspectRatio bounds="parent" {...rndProps}>
            <Box
                component="img"
                ref={screenRef}
                src={imageSrc}
                sx={{
                    width: '100%',
                    height: '100%',
                    // This prevent Rnd from doing some weird things when dragging an image
                    pointerEvents: 'none',
                }}
            />
        </Rnd>
    );
}
