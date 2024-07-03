import { useSearchParams } from 'next/navigation';
import LayoutContainer from './components/LayoutContainer';
import { StateFromParams } from './types';
import { getStateFromParams } from './utils/validators';

export default function Home({ searchParams }: any) {
    let initialState: StateFromParams | undefined;
    let invalidParams = false;

    try {
        if (Object.keys(searchParams).length) {
            initialState = getStateFromParams(searchParams);
        }
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
                <LayoutContainer initialState={initialState} />
            )}
        </main>
    );
}
