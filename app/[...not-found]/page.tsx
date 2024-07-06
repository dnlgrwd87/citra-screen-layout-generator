'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="text-center py-8">
            <h1 className="mb-4 text-4xl font-semibold text-primary-600">Uh-oh!</h1>
            <p className="mb-10 text-2xl font-semibold text-gray-800">We can't find that page.</p>
            <Button
                onClick={() => {
                    router.push('/');
                    router.refresh();
                }}
            >
                Go back home
            </Button>
        </div>
    );
}
