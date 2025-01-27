import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://y-sand-pi.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;