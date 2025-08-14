import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } : {baseUrl: string}) =>
  async ({ url, method, body, headers } : any) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        headers: headers || { "content-type": "application/json" },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as import("axios").AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };