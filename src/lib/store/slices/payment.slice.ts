import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionPlan, SelectedPaymentState } from '../../types/types'; // Importing the SubscriptionPlans interface
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PaymentState {
    selectedSubscriptionPlan: SubscriptionPlan | null; // State for subscription plans
    clientSecretFromStore: string | null; // State for client secret key
    selectedPaymentState: SelectedPaymentState | null; // State for selected payment state
}

const initialState: PaymentState = {
    selectedSubscriptionPlan: null,
    clientSecretFromStore: null,
    selectedPaymentState: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setSelectedSubscriptionPlan(state, action: PayloadAction<SubscriptionPlan>) {
            state.selectedSubscriptionPlan = action.payload; // Update subscription plans
        },
        setClientSecret(state, action: PayloadAction<string>) {
            state.clientSecretFromStore = action.payload; // Update client secret key
        },
        setSelectedPaymentState(state, action: PayloadAction<SelectedPaymentState>) {
            state.selectedPaymentState = action.payload; // Update selected payment state
        },
    },
});

export const { setSelectedSubscriptionPlan, setClientSecret, setSelectedPaymentState } = paymentSlice.actions;
export const usePaymentSelector = () => useSelector((state: RootState) => state.payment);
export default paymentSlice.reducer;
