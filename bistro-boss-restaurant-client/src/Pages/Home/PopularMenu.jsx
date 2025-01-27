import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle';
import MenuItem from '../../Shared/MenuItem';
import useMenu from '../../Hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section>
            <SectionTitle
                heading={"FROM OUR MENU"}
                subHeading={"--- Check it out ---"}
            ></SectionTitle>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className='text-center'>
                <button className="btn btn-outline border-0 border-b-4">VIEW FULL MENU</button>
            </div>
        </section>
    );
};

export default PopularMenu;