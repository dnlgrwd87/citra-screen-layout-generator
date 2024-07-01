import { RefObject } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

interface Props extends RndProps {
    screenRef: RefObject<Rnd>;
    imageSrc: string;
}

export default function Screen(props: Props) {
    const { screenRef, imageSrc, ...rndProps } = props;

    return (
        <Rnd ref={screenRef} lockAspectRatio bounds="parent" {...rndProps}>
            <img src={imageSrc} className="w-full h-full pointer-events-none" />
        </Rnd>
    );
}
