import { useAppKitAccount } from '@reown/appkit/react';
import { useEstimateGas, useSendTransaction } from 'wagmi';
import { parseGwei } from 'viem';


export const useTransaction = (TEST_TX) => {
    const { address } = useAppKitAccount();
    const { sendTransaction, data: hash, error, isPending, status } = useSendTransaction();

    const handleSendTx = () => {
        try {
            sendTransaction({
                ...TEST_TX,
            });
        } catch (err) {
            console.log('Error sending transaction:', err);
        }
    };

    return {
        handleSendTx,
        hash,
        error,
        isPending,
        status,
    };
};
