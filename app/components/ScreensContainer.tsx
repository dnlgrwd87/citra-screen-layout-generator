'use client';

import { RefObject, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import styles from './screens-container.module.scss';

export type Dimensions = {
    width: number;
    height: number;
};

export default function ScreensContainer() {
    const [dimensions, setDimensions] = useState<Dimensions>({
        // steam deck, need a set of defaults
        width: 1200,
        height: 800,
    });

    const [data, setData] = useState<any>({});

    const topScreen = useRef<HTMLDivElement>(null);
    const bottomScreen = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const style = {
        width: dimensions.width,
        aspectRatio: '16 / 9', // steam deck is 16 / 10
        // aspectRatio: '16 / 10',
        border: '1px solid black',
    };

    const getScreenDimensions = (screen: RefObject<HTMLDivElement>) => {
        if (!screen.current || !container.current) {
            return;
        }

        let screenDims = screen.current.getBoundingClientRect();
        let containerDims = container.current.getBoundingClientRect();

        const left = screenDims.left - containerDims.left;
        const right = left + screenDims.width;
        const top = screenDims.top - containerDims.top;
        const bottom = top + screenDims.height;

        return { left, right, bottom, top };

    };
    
    const onClick = () => {
        const data = {
            topScreen: getScreenDimensions(topScreen),
            bottomScreen: getScreenDimensions(bottomScreen),
        };
        // setData({
        //     topScreen: getScreenDimensions(topScreen),
        //     bottomScreen: getScreenDimensions(bottomScreen),
        // });
        
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <div className="flex flex-col gap-4">
            <button onClick={onClick}>Click me</button>
            <div ref={container} className={styles['screens-container']} style={style}>
                {/* Top Screen - 5:3 aspect ratio */}
                <Rnd
                    bounds="parent"
                    lockAspectRatio
                    default={{
                        x: 0,
                        y: 0,
                        width: 500,
                        height: 300,
                    }}
                >
                    <div ref={topScreen} className={styles.screen}></div>
                </Rnd>

                {/* Bottom Screen - 4:3 aspect ratio */}
                <Rnd
                    bounds="parent"
                    lockAspectRatio
                    default={{
                        x: 0,
                        y: 0,
                        width: 200,
                        height: 150,
                    }}
                >
                    <div ref={bottomScreen} className={styles.screen}></div>
                </Rnd>
            </div>
        </div>
    );
}
