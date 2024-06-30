import { Box } from '@mui/material';
import { RefObject } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

interface Props extends RndProps {
    screenRef: RefObject<HTMLImageElement>;
    imageSrc: string;
}

export default function Screen(props: Props) {
    const { screenRef, imageSrc, ...rndProps } = props;

    return (
        <Rnd lockAspectRatio bounds="parent" {...rndProps}>
            <img ref={screenRef} src={imageSrc} className="w-full h-full pointer-events-none" />
        </Rnd>
    );
}
