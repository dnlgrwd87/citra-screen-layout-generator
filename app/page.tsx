import InvalidLayout from './components/InvalidLayout';
import LayoutContainer from './components/LayoutContainer';
import MountedComponent from './components/MountedComponent';
import { getInitialStateFromParams } from './utils';

interface Props {
    searchParams: {
        id?: string;
    };
}

export default function Home({ searchParams }: Props) {
    try {
        const initialState = getInitialStateFromParams(searchParams);

        return (
            <main className="flex justify-center">
                <MountedComponent>
                    <LayoutContainer initialState={initialState} />
                </MountedComponent>
            </main>
        );
    } catch (e) {
        return <InvalidLayout />;
    }
}
