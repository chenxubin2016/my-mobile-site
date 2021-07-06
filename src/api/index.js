import { uploadAction } from "./request";

export const getFilesBuffer = file => {
  const fr = new FileReader();
  fr.readAsArrayBuffer(file);
  fr.onload = e => {
    console.log(e, e.target.result);
    const byteArray = new Uint8Array(e.target.result);
    console.log(byteArray);
  };
};
export const uploadEvent = file => {
  const formData = new FormData();
  formData.append("file", file);
  return uploadAction("/uploadImg", formData);
};
