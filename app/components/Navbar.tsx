'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const currentPath = usePathname();
    const router = useRouter();

    const getLinkClass = (path: string) => {
        return path === currentPath ? 'text-blue-500' : 'text-black hover:text-blue-500';
    };

    return (
        <nav className="border-gray-200 bg-white shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/citra-logo.png"
                        width={40}
                        height={40}
                        alt="Citra Logo"
                        className="rounded-md"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">
                        Citra Layout Generator
                    </span>
                </div>
                <div className="flex gap-8 text-lg">
                    <Link href="/" className={getLinkClass('/')}>
                        Home
                    </Link>
                    <Link
                        href="/generate"
                        className={getLinkClass('/generate')}
                    >
                        Generate
                    </Link>
                </div>
            </div>
        </nav>
    );
}
