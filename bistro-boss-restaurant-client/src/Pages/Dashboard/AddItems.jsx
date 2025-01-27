import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        // Upload image to imagebb and get a url //
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success) {
            // Now we have to send the menu item to the server side with our link // 
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }
            // 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                Swal.fire({
                    title: `${data.name} added successfully!!`,
                    icon: "success"
                });
            }
        }
    };

    return (
        <div>
            <SectionTitle heading="Add an Item" subHeading="--- What's New ---"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Enter Recipe Name"
                            className="input input-bordered w-full" />
                    </label>

                    <div className="flex gap-x-6">
                        {/* Category */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>

                        {/* Price */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                {...register('price')}
                                type="number"
                                placeholder="Enter Price"
                                className="input input-bordered w-full" />
                        </label>
                    </div>

                    {/* Recipie Details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Enter Recipe Details"></textarea>
                    </label>

                    <div className="my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <div>
                        <button className="btn btn-neutral w-full"> Add Item <FaUtensils></FaUtensils> </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddItems;