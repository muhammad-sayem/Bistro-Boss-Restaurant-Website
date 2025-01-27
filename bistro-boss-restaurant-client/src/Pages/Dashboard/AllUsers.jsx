import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaUsers } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      console.log(res.data);  // ekhane main jinish ashe //
      return res.data;
    }
  })

  const handleDeleteUser = (user) => {
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

        axiosSecure.delete(`/users/${user._id}`)
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

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: `${user.name} is admin now`,
            icon: "success"
          });
        }
      })
  }
  return (
    <div className=''>
      <div className='flex justify-evenly my-4'>
        <h2 className='text-3xl font-bold'> All users </h2>
        <h2 className='text-3xl font-bold'> Total users: {users.length} </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td> {user.name} </td>
                  <td>{user.email} </td>
                  <td>
                    {
                      user.role === 'admin' ?
                        "admin"
                        :
                        <button onClick={() => handleMakeAdmin(user)} className="btn text-white bg-[#D1A054]"> <FaUsers size={25}></FaUsers> </button>
                    }
                  </td>

                  <td>
                    <button onClick={() => handleDeleteUser(user)} className="btn bg-red-500 text-white"> <FaTrashAlt size={25}></FaTrashAlt> </button>
                  </td>
                </tr>))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;