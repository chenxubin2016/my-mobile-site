// 16进制标识
const png = [137, 80, 78, 71, 13, 10, 26, 10];
const jpeg = [255, 216, 255, 217];// 开始两位和结束两位

const validateFileType = file => {
  console.log(file);
  const type = file.type.split("/")[1];
};
export default validateFileType;
