import apiCall  from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
const getData = (setApiData) => {
    const token = localStorage.getItem("token");
    const licenses_id = localStorage.getItem("license_key");
    const formData = new FormData();
    formData.append("licenses_id", licenses_id);
    apiCall
        .post("topic-board/list", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(({ data }) => {
            if (data.status) {
                setApiData(data.data);
            } else {
                toast.error(data.msg, { autoClose: 1500 });
            }
        })
        .catch(({ response }) => {
            toast.error(response.data.message || response.data.msg, {
                autoClose: 1500,
            });
        });
};

export default getData 