import SectionTitle from "../../Components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from "react-icons/fa6";

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://y-sand-pi.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
    }, [])

    return (
        <section className="my-20">
            <SectionTitle
                heading={"TESTIMOIALS"}
                subHeading={"--- What Our Clients Say ---"}
            ></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="px-24 py-12 flex flex-col items-center">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                                className="mb-4"
                            />
                            <FaQuoteLeft size={100}></FaQuoteLeft>
                            <p className="py-6"> {review.details} </p>
                            <h3 className="text-orange-500 text-2xl font-semibold"> {review.name} </h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonial;