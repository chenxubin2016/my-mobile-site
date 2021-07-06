import axios from "axios";

const baseURL = "http://127.0.0.1:7001";

export function postAction(url, parameter) {
  return axios({
    baseURL,
    url,
    method: "post",
    data: parameter
  });
}

// post method= {post | put}
export function httpAction(url, parameter, method) {
  return axios({
    baseURL,
    url,
    method,
    data: parameter
  });
}

// put
export function putAction(url, parameter) {
  return axios({
    baseURL,
    url,
    method: "put",
    data: parameter
  });
}

// get
export function getAction(url, parameter) {
  return axios({
    baseURL,
    url,
    method: "get",
    params: parameter
  });
}

// deleteAction
export function deleteAction(url, parameter) {
  return axios({
    baseURL,
    url,
    method: "delete",
    params: parameter
  });
}


export function downFile(url, parameter) {
  return axios({
    baseURL,
    url,
    params: parameter,
    method: "get",
    responseType: "blob"
  });
}

export function uploadAction(url, parameter, cb) {
  return axios({
    baseURL,
    url,
    data: parameter,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"// 文件上传
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.lengthComputable) {
        cb(progressEvent);
      }
    }
  });
}
