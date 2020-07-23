import axios from "axios";

const getAPI = async (url) => {
  const value = await axios({
    method: "GET",
    url,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      return e;
    });

  return value;
};

const postAPI = async (url, data) => {
  const value = await axios({
    method: "POST",
    url,
    data,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      return e;
    });

  return value;
};

export { getAPI, postAPI };
