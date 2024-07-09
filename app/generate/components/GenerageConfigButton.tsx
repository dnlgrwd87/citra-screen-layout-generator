import { Button, ButtonProps } from '@mui/material';
import { useState } from 'react';
import CustomModal from '../../components/CustomModal';
import ConfigValues from '../../generate/components/ConvigValues';
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
