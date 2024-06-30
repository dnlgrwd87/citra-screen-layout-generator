import Screen from './components/Screen';
import ScreensContainer from './components/ScreensContainer';
import './main.css';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ScreensContainer/>
        </main>
    );
}
