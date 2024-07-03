'use client';

import Check from '@mui/icons-material/Check';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { Box, Button, ButtonProps } from '@mui/material';
import { useState } from 'react';

interface Props extends ButtonProps {
    copyText: string;
}

export default function CopyButton(props: Props) {
    const { copyText, ...buttonProps } = props;
    const [copied, setCopied] = useState(false);

    const onClick = async () => {
        try {
            await navigator.clipboard.writeText(props.copyText);

            setCopied(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const getText = () => {
        if (!copied) {
            return props.children || <ContentCopy />;
        }

        return (
            <div className="flex items-center gap-2" onClick={() => setCopied(false)}>
                <span className="text-gray-700">Copied</span>
                <Check
                    sx={{
                        fontSize: 16,
                        color: '#5bc45b',
                    }}
                />
            </div>
        );
    };

    return (
        <Box className="flex" sx={{ height: 42 }}>
            <Button
                {...buttonProps}
                onClick={onClick}
                sx={{
                    pointerEvents: copied ? 'none' : 'inherit',
                    background: copied ? 'white' : 'initial',
                }}
            >
                {getText()}
            </Button>
        </Box>
    );
}
