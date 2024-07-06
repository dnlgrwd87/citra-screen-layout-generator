import InvalidLayout from './components/InvalidLayout';
import LayoutContainer from './components/LayoutContainer';
import MountedComponent from './components/MountedComponent';
import { GAMES } from './constants';
import { StateFromParamsSchema } from './schemas';
import { InitialState, ParsedParams } from './types';
import { decodeParams } from './utils';

interface Props {
    searchParams: {
        id?: string;
    };
}

export default function Home({ searchParams }: Props) {
    let initialState: InitialState | null = null;
    let invalidParams = false;

    const getInitialState = (): InitialState | null => {
        if (!searchParams.id) {
            return null;
        }

        const decodedParams = JSON.parse(decodeParams(searchParams.id));
        const parsedParams = StateFromParamsSchema.parse(decodedParams) as ParsedParams;

        return {
            resolution: {
                width: parsedParams.resolutionWidth,
                height: parsedParams.resolutionHeight,
            },
            game: GAMES[parsedParams.gameId],
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
        <main className="flex justify-center">
            {invalidParams ? (
                <InvalidLayout />
            ) : (
                <MountedComponent>
                    <LayoutContainer initialState={initialState} />
                </MountedComponent>
            )}
        </main>
    );
}
