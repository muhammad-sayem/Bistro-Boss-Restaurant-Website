import React from 'react';
import { FaAd, FaBook, FaHamburger, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { FaCalendar, FaCalendarCheck, FaEnvelope, FaHouse, FaMoneyBill, FaSpoon } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import { MdRateReview } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from '../Hooks/useAdmin';
import useCart from '../Hooks/useCart';

const DashBoard = () => {
   const [isAdmin] = useAdmin();
   const [cart] = useCart();

   return (
      <div className='flex'>

         {/* Dashboard sidebar */}
         <div className='w-64 min-h-screen bg-[#D1A054]'>
            <div className='text-center my-6 space-y-2'>
               <h2 className='text-3xl font-black'> BISTRO BOSS </h2>
               <h4 className='text-xl font-semibold'> RESTAURANT </h4>
            </div>
            <ul className="menu">
               {
                  isAdmin ?
                     <>
                        <li> <NavLink to='/dashboard/adminHome'> <FaHouse></FaHouse> Admin Home </NavLink> </li>

                        <li> <NavLink to='/dashboard/addItems'> <FaSpoon></FaSpoon> Add Items </NavLink> </li>

                        <li> <NavLink to='/dashboard/manageItems'> <GiHamburgerMenu></GiHamburgerMenu> Manage Items </NavLink> </li>

                        <li> <NavLink to='/dashboard/manageBookings'> <FaBook></FaBook> Manage Bookings </NavLink> </li>

                        <li> <NavLink to='/dashboard/users'> <FaUsers></FaUsers> All Users </NavLink> </li>

                     </>
                     :
                     <>
                        <li> <NavLink to='/dashboard/userHome'> <FaHouse></FaHouse> User Home </NavLink> </li>

                        <li> <NavLink to='/dashboard/reservation'> <FaCalendar></FaCalendar> My Reservation </NavLink> </li>

                        <li> <NavLink to='/dashboard/paymentHistory'> <FaMoneyBill></FaMoneyBill> Payment History </NavLink> </li>

                        <li> <NavLink to='/dashboard/cart'> <FaShoppingCart></FaShoppingCart> My cart ({cart.length}) </NavLink> </li>

                        <li> <NavLink to='/dashboard/review'> <MdRateReview></MdRateReview> Add Review </NavLink> </li>

                        <li> <NavLink to='/dashboard/bookings'> <FaCalendarCheck></FaCalendarCheck>  My Booking </NavLink> </li>
                     </>
               }

               <div className="divider"></div>

               {/* Common for both admin and users */}

               <li> <NavLink to='/'> <FaHouse></FaHouse> Home </NavLink> </li>

               <li> <NavLink to='/menu'> <GiHamburgerMenu></GiHamburgerMenu>  Menu </NavLink> </li>

               <li> <NavLink to='/contact'> <FaEnvelope></FaEnvelope>  Contact </NavLink> </li>

            </ul>
         </div>

         {/* Dashboard Content */}
         <div className='flex-1 p-12'>
            <Outlet></Outlet>
         </div>

      </div>
   );
};

export default DashBoard;