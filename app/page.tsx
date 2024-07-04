import LayoutContainer from './components/LayoutContainer';
import { games, resolutions } from './constants';
import { InitialState, ParsedParams } from './types';
import { decodeParams } from './utils/screenUtils';
import { StateFromParamsSchema } from './utils/validators';

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
                topScreen: defuaultResolution.defaultScreenData.top,
                bottomScreen: defuaultResolution.defaultScreenData.bottom,
            };
        }

        const decodedParams = JSON.parse(decodeParams(searchParams.id));
        const parsedParams = StateFromParamsSchema.parse(decodedParams) as ParsedParams;

        return {
            resolution: resolutions[parsedParams.resolutionId],
            game: games[parsedParams.gameId],
            topScreen: {
                x: parsedParams.topX,
                y: parsedParams.topY,
                width: parsedParams.topWidth,
                height: parsedParams.topHeight,
            },
            bottomScreen: {
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
