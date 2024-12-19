import toast from "react-hot-toast";
import nodataIcon from "./nodata.png";
export default function () {
  return (error: any) => {
    const errorRes = error?.response?.data;
    if (errorRes) {
      toast.error(errorRes.error || errorRes.info);
    } else if (error.messag) toast.error(error.messag);
    else toast.error(error);
  };
}

export const nodataImg = nodataIcon;
