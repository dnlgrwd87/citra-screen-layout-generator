import LayoutContainer from './components/LayoutContainer';
import { games, resolutions } from './constants';
import { InitialState } from './types';
import { getParsedParams } from './utils/validators';

export default function Home({ searchParams }: any) {
    let initialState: InitialState | undefined;
    let invalidParams = false;

    const getInitialState = (): InitialState => {
        if (!Object.keys(searchParams).length) {
            // todo: calculate this based on browser width
            const defuaultResolution = resolutions._1920x1080;

            return {
                resolution: defuaultResolution,
                game: games.zelda,
                defaultTop: defuaultResolution.defaultScreenData.top,
                defaultBottom: defuaultResolution.defaultScreenData.bottom,
            };
        }

        const parsedParams = getParsedParams(searchParams);

        console.log(parsedParams);

        return {
            resolution: resolutions[parsedParams.resolutionId],
            game: games[parsedParams.gameId],
            defaultTop: {
                x: parsedParams.topX,
                y: parsedParams.topY,
                width: parsedParams.topWidth,
                height: parsedParams.topHeight,
            },
            defaultBottom: {
                x: parsedParams.bottomX,
                y: parsedParams.bottomY,
                width: parsedParams.bottomWidth,
                height: parsedParams.bottomHeight,
            },
        } as InitialState;
    };

    try {
        initialState = getInitialState();
    } catch (e) {
        console.log(e.message);
        invalidParams = true;
    }

    return (
        <main className="flex justify-center p-8">
            {invalidParams ? (
                <div>
                    <h1>Could not generate layout from url</h1>
                </div>
            ) : (
                <LayoutContainer initialState={initialState!} />
            )}
        </main>
    );
}
