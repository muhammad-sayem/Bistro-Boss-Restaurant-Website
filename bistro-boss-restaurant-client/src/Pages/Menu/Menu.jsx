import { Helmet  } from 'react-helmet-async';
import Cover from '../../Shared/Cover';
import menuImg from "../../assets/menu/menu-bg.jpg";
import useMenu from '../../Hooks/useMenu';
import SectionTitle from '../../Components/SectionTitle';
import MenuCategory from '../../Shared/MenuCategory';
import dessertImage from "../../assets/menu/dessert-bg.jpeg";
import pizzaImage from "../../assets/menu/pizza-bg.jpg";
import soupImage from "../../assets/menu/soup-bg.jpg";
import saladImage from "../../assets/menu/salad-bg.jpg";

const Menu = () => {
    const [menu] = useMenu();

    const desserts = menu.filter(item => item.category === "dessert");
    const pizzas = menu.filter(item => item.category === "pizza");
    const salads = menu.filter(item => item.category === "salad");
    const soups = menu.filter(item => item.category === "soup");
    const offered = menu.filter(item => item.category === "offered");
    
    return (
        <div>
            <Helmet>
                <title> Bistro Boss | Menu </title>
            </Helmet>

            <Cover img={menuImg} title={"our menu"}></Cover>

            {/* Main Cover */}
            <SectionTitle heading="today's offer" subHeading="--- Don't miss ---"></SectionTitle>

            {/* Offered Menu Items */}
            <MenuCategory items={offered}></MenuCategory>

            {/* Dessert items */}
            <MenuCategory items={desserts} title='dessert' img={dessertImage}></MenuCategory>

            {/* Pizza items */}
            <MenuCategory title="pizza" img={pizzaImage} items={pizzas}></MenuCategory>

            {/* Soups items */}
            <MenuCategory title="soup" img={soupImage} items={soups}></MenuCategory>

            {/* Pizza items */}
            <MenuCategory title="salad" img={saladImage} items={salads}></MenuCategory>
            
        </div>
    );
};

export default Menu;