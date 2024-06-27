import Screen from './components/Screen';
import './main.css';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex screens-container">
              <Screen />
            </div>
        </main>
    );
}
