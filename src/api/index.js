import axios from "axios";

export const fetchData = async () => {
  try {
    const res = await axios.get("https://disease.sh/v3/covid-19/jhucsse/counties");
    const data = [];
    res.data.forEach((e) => {
      const modified = {
        state: e.province,
        county: e.county,
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
