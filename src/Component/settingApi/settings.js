import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
const getSetting = (
  setSelectedIconCount,
  setSelectedGender,
  setSelectedLanguage,
  setCalendarOn,
  setIntroductionOn,
  setLoader,
  setConcerns,
  setNeedboard,
  setUncheckNeedBoard,
  setUncheckConcerns
) => {
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const payload = new FormData();
  payload.append("licenses_id", licenses_id);
  api
    .post(`getSettings`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      if (data?.status) {
        console.log("ddddddddd",data.data)
        setSelectedIconCount(Number(data?.data?.number_of_icons));
        setSelectedGender(data?.data?.gender);
        setSelectedLanguage(data?.data?.language);
        setCalendarOn(
          data?.data?.calendar === true ||
            data?.data?.calendar === "true" ||
            data?.data?.calendar === 1
        );
        setIntroductionOn(
          data?.data?.introduction === true ||
            data?.data?.introduction === "true" ||
            data?.data?.introduction === 1
        );
        setUncheckNeedBoard(data?.data?.uncheck_need_board);
        setUncheckConcerns(data?.data?.uncheck_concerns);
        setConcerns(data?.data?.concerns);
        setNeedboard(data?.data?.need_board);
      } else {
        toast.error(data?.msg, { autoClose: 1500 });
      }
      setLoader(false);
    })
    .catch(({ response }) => {
      toast.error(response?.data?.message || response?.data?.msg, {
        autoClose: 1500,
      });
      setLoader(false);
    });
};

export default getSetting;
