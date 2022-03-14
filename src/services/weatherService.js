const axios = require("axios");
module.exports = {
  getWeatherData: async () => {
    const locations = [];
    for (let i = 1; i < 4; i++) {
      locations.push(process.env[`WEATHER_LOCATION_${i}`]);
    }
    const data = [];
    const promises = [];

    locations.forEach((name) => {
      promises.push(
        new Promise((resolve) => {
          (async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`;
            return axios({
              url,
              method: "get",
            })
              .then((response) => {
                if (response.status === 200) {
                  const { name } = response.data;
                  const { temp } = response.data.main;
                  const { speed } = response.data.wind;
                  const { description } = response.data.weather[0];
                  data.push({ name, temp, wind: speed, description });
                  resolve(true);
                } else {
                  resolve(false);
                }
              })
              .catch((error) => {
                console.log(error);
                resolve(false);
              });
          })();
        })
      );
    });

    await Promise.all(promises);
    return data;
  },
};
