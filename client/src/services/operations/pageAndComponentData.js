import { catalogData } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";

export const categoryPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId,
      }
    );
    console.log("CATALOG DATA API RESPONSE.....", response);

    if (!response.data.success) {
      throw new Error("Could not fetch category page data.. ");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};

