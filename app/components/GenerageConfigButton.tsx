import { Button, ButtonProps } from '@mui/material';
import { useState } from 'react';
import { ScreenData } from '../types';
import ConfigValues from './ConvigValues';
import CustomModal from './CustomModal';

interface Props extends ButtonProps {
    topScreen: ScreenData;
    bottomScreen: ScreenData;
}

export default function GenerateConfigButton(props: Props) {
    const { topScreen, bottomScreen, ...buttonProps } = props;

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button {...buttonProps} onClick={() => setShowModal(true)}>
                Generate Config
            </Button>
            <CustomModal
                open={showModal}
                onClose={() => setShowModal(false)}
                contentStyles={{
                    paddingTop: '20px',
                }}
            >
                <ConfigValues topScreen={topScreen} bottomScreen={bottomScreen} />
            </CustomModal>
        </>
    );
}
