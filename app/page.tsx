import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex p-10 justify-center">
            <div className="w-3/4">
                <h1 className="mb-8 text-4xl">Welcome!</h1>
                <div className="mb-8 text-lg font-medium text-gray-900">
                    <div>
                        Citra Layout Generator is a tool facilitates creating custom screen layouts
                        for the Citra emulator.
                    </div>
                    <div>
                        It is a work in progress. Please report any issues on the{' '}
                        <Link
                            href="https://github.com/dnlgrwd87/citra-screen-layout-generator"
                            className="text-blue-500"
                        >
                            GitHub page
                        </Link>
                        , and feel free to contribute!
                    </div>
                </div>
                <div className="text-md mb-2 font-medium">How to use</div>
                <ul className="space-y-1 text-gray-800 list-decimal list-inside text-sm">
                    <li>
                        Visit the{' '}
                        <Link href="/generate" className="text-blue-500">
                            generate page
                        </Link>
                        .
                    </li>
                    <li>
                        {
                            "Change the resolution if needed. The default resolution is inferred by your device's screen but may not be correct."
                        }
                    </li>
                    <li>Drag and resize the images to your liking.</li>
                    <li>
                        Click the <b>Generate Config</b> button and copy the values.
                    </li>
                    <li>
                        Locate the <b>qt-config.ini</b> file within your Citra folder on your device
                        and open it.
                    </li>
                    <li>
                        Find the <b>[Layout]</b> section. Replace all the values in it with the
                        values you copied earlier and save the file.
                    </li>
                </ul>
            </div>
        </div>
    );
}
