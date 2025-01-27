import FoodCard from "./FoodCard";

const OrderTab = ({ items }) => {
    return (
        <div className="mx-auto border-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                items.map(item => <FoodCard
                    key={item._id}
                    item={item}
                ></FoodCard>)
            }
        </div>

    );
};

export default OrderTab;