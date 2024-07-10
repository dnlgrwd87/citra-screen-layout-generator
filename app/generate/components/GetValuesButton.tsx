import { Button, ButtonProps } from '@mui/material';
import { useState } from 'react';
import CustomModal from '../../components/CustomModal';
import ScreenDisplayValues from './ScreenDisplayValues';
import { ScreenData } from '../../types';

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
                Get Values
            </Button>
            <CustomModal
                open={showModal}
                onClose={() => setShowModal(false)}
                contentStyles={{
                    paddingTop: '20px',
                }}
            >
                <ScreenDisplayValues topScreen={topScreen} bottomScreen={bottomScreen} />
            </CustomModal>
        </>
    );
}
