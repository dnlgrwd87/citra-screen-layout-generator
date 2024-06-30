import Screen from './components/Screen';
import ScreensContainer from './components/ScreensContainer';
import './main.css';

export default function Home() {
    return (
        <main className="flex min-h-screen justify-center p-8">
            <ScreensContainer/>
        </main>
    );
}
