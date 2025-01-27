import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (totalPrice) {
            axiosSecure.post('/create-payment-intent', { totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log("Payment error", error);
            setError(error.message);
        }
        else {
            console.log("Payment Method", paymentMethod);
            setError('');
        }

        // Confirm Payment //
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "Anonymous",
                    name: user?.displayName || "Anonymous",
                }
            }
        });

        if (confirmError) {
            console.log('Confirm Error', confirmError);
        }
        else {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log("Transaction ID", paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Now save the payment in the database //
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartId: cart.map(item => item._id),
                    menuItemId: cart.map(item => item.menuId),
                    status: "Pending"
                }

                const res = await axiosSecure.post('/payments', payment);
                // console.log("Payment Saved", res);
                if (res.data.paymentResult.insertedId) {
                    Swal.fire({
                        title: "Payment successful!!",
                        icon: "success"
                    });
                }

                refetch();
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-md btn-neutral my-6" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600"> {error} </p>
                {transactionId && <p className="text-green-600"> Your Transaction ID: {transactionId} </p>}
            </form>
        </div>
    );
};

export default CheckoutForm;