import { useCallback, useReducer, useState } from 'react';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd';

const rndAlert = () => alert('The block cannot enter the right side of the black line!');

export default () => {
    // Use a key to control Rnd element
    // Update the key to clean broken one if resizing is no-op.
    const [key, updateKey] = useReducer((x) => x + 1, 0);

    const [state, setState] = useState({ x: 100, y: 100, width: 50, height: 50 });

    const onDragStop: RndDragCallback = useCallback(
        (e, d) => {
            if (d.x + state.width > 800) {
                rndAlert();
                return;
            }
            setState((x) => ({ ...x, x: d.x, y: d.y }));
        },
        [state.width]
    );

    const onResizeStop: RndResizeCallback = useCallback((e, direction, ref, delta, position) => {
        const right = position.x + ref.offsetWidth;
        if (right > 200) {
            rndAlert();
            updateKey();
            return;
        }

        setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
        });
    }, []);

    return (
        <Rnd
            bounds="parent"
            key={key}
            position={{
                x: state.x,
                y: state.y,
            }}
            size={{ width: state.width, height: state.height }}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
        >
            <div style={{ width: '100%', height: '100%', background: 'red' }}>
                {state.x} -- {state.y}
            </div>
        </Rnd>
    );
};
