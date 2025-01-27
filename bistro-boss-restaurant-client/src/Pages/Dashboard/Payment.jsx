import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="--- Pay First ---"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}> 
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;