import { FaGoogle } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res => {
            console.log(res.user);
            const userInfo = {
                name: res?.user?.displayName,
                email: res?.user?.email,
            }

            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-neutral w-full">
                <FaGoogle></FaGoogle> Sign in with google
            </button>
        </div>
    );
};

export default SocialLogin;