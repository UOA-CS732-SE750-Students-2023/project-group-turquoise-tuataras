import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

export async function getNearbySupermarkets(lat, lng){
    const apiURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=15000&type=supermarket&key="+API_KEY;
    const response = await axios.get(apiURL);
    //console.log(response);
    console.log(response.data.results);
    console.log("Number of results: " + response.data.results.length)
    return response.data.results;
}