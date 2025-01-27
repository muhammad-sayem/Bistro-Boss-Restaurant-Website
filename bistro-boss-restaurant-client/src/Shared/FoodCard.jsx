import React from 'react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useCart from '../Hooks/useCart';

const FoodCard = ({ item }) => {
    const { _id, name, image, price, recipe } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();

    const handleAddToCart = (food) => {
        if (user && user.email) {
            // Send the data to the database //
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: `${name} Added to the cart successfully!!`,
                            icon: "success"
                        });
                        // refetch the cart to update count //
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "Can't add food to the cart",
                text: "You must need to logged in before place an order",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Send user to the login page //
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="Food image" className='w-full' />
            </figure>

            <p className='bg-black text-white absolute right-0 mt-4 mr-6 px-3 py-1'> ${price} </p>

            <div className="card-body flex flex-col items-center text-center">
                <h2 className="card-title"> {name}</h2>
                <p> {recipe} </p>
                <div className="card-actions justify-end">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-outline border-0 border-b-4 bg-slate-200 border-orange-400"> ADD TO CART </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;