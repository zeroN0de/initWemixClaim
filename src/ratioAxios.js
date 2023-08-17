const axios = require("axios");

const ratioAxios = () => {
  axios
    .get("https://api.wemix.fi/ncpstaking/main")
    .then((res) => {
      let MC = res.data.data.PID15;
      console.log(MC);
    })
    .catch((err) => {
      console.log(err);
    });
};
ratioAxios();
