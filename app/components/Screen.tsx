import { Box } from '@mui/material';
import { RefObject } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';

interface Props extends RndProps {
    screenRef: RefObject<HTMLDivElement>;
}

export default function Screen(props: Props) {
    const { screenRef, ...rndProps } = props;

    return (
        <Rnd lockAspectRatio bounds="parent" {...rndProps}>
            <Box
                ref={screenRef}
                sx={{
                    width: '100%',
                    height: '100%',
                    border: '1px solid gray',
                    overflow: 'hidden',
                }}
            />
        </Rnd>
    );
}
