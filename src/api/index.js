import axios from "axios";

export const fetchWorldData = async () => {
  const url = "https://disease.sh/v3/covid-19/jhucsse";

  try {
    const res = await axios.get(`${url}`);
    const data = [];
    res.data.forEach((e) => {
      const modified = {
        province: e.province,
        county: e.county,
        country: e.country,
        confirmed: e.stats.confirmed,
        deaths: e.stats.deaths,
        recovered: e.stats.recovered,
        latitude: e.coordinates.latitude,
        longitude: e.coordinates.longitude,
      };

      data.push(modified);
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchUSData = async () => {
  const url = "https://disease.sh/v3/covid-19/jhucsse/counties";

  try {
    const res = await axios.get(`${url}`);
    const data = [];
    res.data.forEach((e) => {
      const modified = {
        state: e.province,
        county: e.county,
        country: e.country,
        confirmed: e.stats.confirmed,
        deaths: e.stats.deaths,
        recovered: e.stats.recovered,
        latitude: e.coordinates.latitude,
        longitude: e.coordinates.longitude,
      };

      data.push(modified);
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};