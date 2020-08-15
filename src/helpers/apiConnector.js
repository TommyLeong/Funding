import axios from "axios";

const getAPI = async (url) => {
  let value = null;
  await axios({
    method: "GET",
    url,
  })
    .then((response) => {
      console.log(response);
      value = response;
    })
    .catch((e) => {
      return e;
    });

  console.log(value);
  return value;
};

const postAPI = async (url, data) => {
  let value = null;
  await axios({
    method: "POST",
    url,
    data,
  })
    .then((response) => {
      console.log(response);
      value = response;
    })
    .catch((e) => {
      return e;
    });

  return value;
};

const putAPI = async (url, data) => {
  let value = null;
  await axios({
    method: "PUT",
    url,
    data,
  })
    .then((response) => {
      console.log(response);
      value = response;
    })
    .catch((e) => {
      return e;
    });

  return value;
};

export { getAPI, postAPI, putAPI };
