import API from "./";

const fetch = async (page, pageSize) => {
  const data = await API.get(`passenger?page=${page}&size=${pageSize})`);
  return data;
};

export const passengerService = {
  fetch,
};
