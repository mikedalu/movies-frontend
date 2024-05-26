import axios from "axios";

//Create axios instane with base URL for reusability
const axiosInstance = (data) => {
	return axios.create({ baseURL: "http://localhost:5183/api/movies", data: { ...data } });
};

export default axiosInstance;
