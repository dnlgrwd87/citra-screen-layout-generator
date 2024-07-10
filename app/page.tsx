import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex p-10 justify-center">
            <div className="w-3/4">
                <h1 className="mb-8 text-4xl">Welcome!</h1>
                <div className="mb-8 text-md font-medium text-gray-900">
                    <div>
                        Citra Layout Generator is a tool that facilitates creating custom screen
                        layouts for the Citra3DS and Lime3DS emulators. It is a work in progress.
                        Please report any issues on the{' '}
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
                <ul className="space-y-2.5 text-gray-800 list-decimal list-inside text-sm">
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
                    <li>
                        Drag and resize the images to your liking, and click the <b>Get Values</b>{' '}
                        button.
                    </li>
                    <li>
                        Copy and set the values.
                        <ul className="list-disc pt-2.5 pl-8 space-y-2.5">
                            <li>
                                If you are using <b>Citra3DS</b>, or{' '}
                                <b>Lime3DS version {'<'} 2114</b>
                                <ul className="list-disc pt-2.5 pl-8 space-y-2.5">
                                    <li>
                                        Copy the values in the <b>Config</b> tab.
                                    </li>
                                    <li>
                                        Locate the <b>qt-config.ini</b> file on your device. Find
                                        the <b>[Layout]</b> section. Replace all the values in it
                                        with the values you copied earlier and save the file.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="list-disc pt-2.5 pl-8 space-y-2.5">
                            <li>
                                If you are using <b>Lime 3DS verion {'>='} 2114</b>
                                <ul className="list-disc pt-2.5 pl-8 space-y-2.5">
                                    <li>
                                        Copy the values in the <b>Human Readable</b> tab.
                                    </li>
                                    <li>
                                        Open <b>Lime3DS</b>, go to{' '}
                                        <b>{'Settings > Graphics > Layout'}</b>. In the{' '}
                                        <b>Screens</b> section, change <b>Screen Layout</b> to{' '}
                                        <b>Custom Layout</b>. In the <b>Custom Layout</b> section,
                                        change the values to the ones you copied earlier.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
