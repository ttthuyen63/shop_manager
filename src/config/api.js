import axios from "axios";

//config cho tất cả api
export const customAxios = axios.create({
  // baseURL: "https://635a75b46f97ae73a62d386d.mockapi.io",
  baseURL: "http://a8ce-2402-800-7145-faa8-10e5-5c1d-2e4c-186f.ngrok.io",
  // timeout: 10000, //nếu quá 10s không có phản hồi thì api lỗi luôn
  //   hearders: { "X-Custom-Header": "foobar" },
});

export const url =
  "http://a8ce-2402-800-7145-faa8-10e5-5c1d-2e4c-186f.ngrok.io";
