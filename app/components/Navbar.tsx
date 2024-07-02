'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const currentPath = usePathname();

    const getLinkClass = (path: string) => {
        return path === currentPath ? 'text-blue-500' : 'text-white hover:text-blue-500';
    };

    return (
        <nav className="border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        src="/images/citra-logo.png"
                        width={40}
                        height={40}
                        alt="Citra Logo"
                        className="rounded-md"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Citra Layout Generator
                    </span>
                </div>
                <div className="flex gap-8 text-lg">
                    <Link href="/" className={getLinkClass('/')}>
                        Generator
                    </Link>
                    <Link href="/about" className={getLinkClass('/about')}>
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
