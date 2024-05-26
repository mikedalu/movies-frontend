import axios from "axios";

const axiosInstance = (data) => {
	return axios.create({ baseURL: "http://localhost:5183/api/movies", data: { ...data } });
};

export default axiosInstance;
