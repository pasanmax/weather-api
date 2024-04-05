const Weather = require("../models/Weather");
const axios = require("axios");

function generateRandomTemperature() {
    const minTemperature = 2;
    const maxTemperature = 50;
    const randomTemperature = Math.random() * (maxTemperature - minTemperature) + minTemperature;

    return Math.round(randomTemperature * 100) / 100;
};

function generateRandomHumidity() {
    const randomHumidity = Math.random() * 100;
    return Math.round(randomHumidity * 100) / 100;
}

function generateRandomAirPressure() {
    const minPressure = 900;
    const maxPressure = 1100;
    const randomPressure = Math.random() * (maxPressure - minPressure) + minPressure;
    return Math.round(randomPressure * 100) / 100;
  }
  
async function getDistrictsFromDatabase() {
    try {
        const response = await axios.get(process.env.API_URL)
            .then(res => { return res.data });

        //this.districts = response;
        return response;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
}

  saveRandomValuesToDatabase = async () => {
    try {
      
        //await getDistrictsFromDatabase();
        //console.log(await getDistrictsFromDatabase());
        const districts = await getDistrictsFromDatabase();
        districts.forEach(async data => {
            let districtName = data.district;
            let randomTemperature = generateRandomTemperature();
            let randomHumidity = generateRandomHumidity();
            let randomAirPressure = generateRandomAirPressure();

            const bodyData = {
                "districtName": districtName,
                "randomTemperature": randomTemperature,
                "randomHumidity": randomHumidity,
                "randomAirPressure": randomAirPressure
            };

            await axios.put(process.env.API_URL + data._id, bodyData).then(res => {
                //console.log("Updated data");
            })

            //console.log({ districtName, randomTemperature, randomHumidity, randomAirPressure })
        });
        console.log("Updated data");
      
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
  }

module.exports = {
    saveRandomValuesToDatabase
}
