import React from 'react';
import useCart from '../../Hooks/useCart';
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/carts/${id}`)
          .then(res => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
            refetch();
          })
      }
    });
  }

  return (
    <div>
      <div className='flex justify-around items-center mb-12'>
        <h2 className="text-6xl"> Ordered Items: {cart.length} </h2>
        <h2 className="text-4xl"> Total Price: {totalPrice} </h2>
        {cart.length ? <Link to="/dashboard/payment">
          <button className='btn btn-neutral'> Pay </button>
        </Link>
          :
          <button disabled className='btn btn-neutral'> Pay </button>
        }
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item, index) => (<tr key={item._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p> {item.name} </p>
                </td>
                <td> ${item.price} </td>
                <th>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs text-red-500"> <FaTrash size={20}></FaTrash> </button>
                </th>
              </tr>))
            }
          </tbody>
        </table>
      </div>
    </div>


  );
};

export default Cart;