const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="flex gap-x-4">
            <img className="w-[80px] rounded-r-full rounded-b-full" src={image} alt="" />
            <div>
                <h4 className="uppercase"> {name} ----------- </h4>
                <p> {recipe} </p>
            </div>
            <p className="text-[#D99904]">${price}</p>
        </div>
    );
};

export default MenuItem;