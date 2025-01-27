import { useState } from "react";
import orderCover from "../../assets/shop/banner2.jpg"
import Cover from "../../Shared/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../Hooks/useMenu";
import FoodCard from "../../Shared/FoodCard";
import OrderTab from "../../Shared/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = useMenu();

    const desserts = menu.filter(item => item.category === "dessert");
    const pizzas = menu.filter(item => item.category === "pizza");
    const salads = menu.filter(item => item.category === "salad");
    const soups = menu.filter(item => item.category === "soup");
    const drinks = menu.filter(item => item.category === "drinks");

    return (
        <div>
            <Helmet>
                <title> Bistro Boss | Order </title>
            </Helmet>

            <Cover img={orderCover} title='ORDER FOOD'></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab> SALAD </Tab>
                    <Tab> PIZZA </Tab>
                    <Tab> SOUPS </Tab>
                    <Tab> DESSERTS </Tab>
                    <Tab> DRINKS </Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salads}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={pizzas}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={soups}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;