'use client';

import { ReactNode, useEffect, useState } from 'react';

interface Props {
    children: ReactNode;
}

export default function MountedComponent(props: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? props.children : null;
}
