import React from 'react';
import MenuItem from './MenuItem';
import Cover from './Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className='mb-8'>
            {title && <Cover img={img} title={title}></Cover>}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 my-20'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className='text-center'>
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4">ORDER NOW</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;