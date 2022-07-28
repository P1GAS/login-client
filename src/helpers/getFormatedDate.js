import dayjs from "dayjs";

const getFormatedDate = (date) => dayjs(date).format("DD/MM/YYYY");

export default getFormatedDate;
