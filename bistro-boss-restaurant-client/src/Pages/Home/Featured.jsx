import SectionTitle from "../../Components/SectionTitle";
import featuredImage from "../../assets/home/featured.jpg";
import "./Featured.css"

const Featured = () => {
    return (
        <section className="featured-item bg-fixed pt-8 pb-16 my-20 text-white">
            <SectionTitle
                heading={"FROM OUR MENU"}
                subHeading={"--- Featured Item ---"}
            ></SectionTitle>

            <div className="md:flex justify-center items-center gap-x-12 px-20 py-8  bg-black bg-opacity-50">
                <div>
                    <img src={featuredImage} alt="" />
                </div>

                <div>
                    <p className="uppercase text-lg"> 12th January, 2025 </p>
                    <h2 className="uppercase text-xl"> Where can I get some? </h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, ipsum nihil cumque aliquam labore impedit animi? Assumenda nisi culpa nihil, et corrupti vitae aperiam ad iure, odio, quis in sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, nihil?</p>

                    <button className="btn btn-outline border-0 border-b-4 border-white text-white">ORDER NOW</button>
                </div>
            </div>


        </section>
    );
};

export default Featured;