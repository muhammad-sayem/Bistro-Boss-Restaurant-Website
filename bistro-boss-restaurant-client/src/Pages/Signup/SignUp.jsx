import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin";

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    // console.log("Form Submitted:", data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            // console.log("User profile info updated");
            const userInfo = {
              name: data.name,
              email: data.email
            }

            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log("user added to the database");
                  reset();
                  Swal.fire({
                    title: "Registration Successfull",
                    icon: "success"
                  });
                  navigate('/');
                }
              })
          })
          .then(err => {
            console.log(err);
          })
      })
  };

  return (
    <>
      <Helmet>
        <title> Bistro Boss | Sign Up </title>
      </Helmet>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  {...register("photoURL", { required: "Photo URL is required" })}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "Password is required",

                    minLength: { value: 6, message: "Password must be at least 6 characters long" },

                    maxLength: { value: 20, message: "Password can't be more than 20 letters!" },

                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/,

                      message: "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number.",
                    },
                  })}


                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6 bg-blue-700 py-3 text-white text-xl hover:cursor-pointer">
                <input type="submit" value="Sign Up" className="hover:cursor-pointer" />
              </div>

              <SocialLogin></SocialLogin>

              <p className="px-8"> Already have an account? <Link to='/login'> Login </Link> </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
