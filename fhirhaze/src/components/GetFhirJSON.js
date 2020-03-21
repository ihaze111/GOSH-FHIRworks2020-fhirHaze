import axios from "axios";

//This function ansynchronously pulls the api
async function getFhirJSON(){
    const baseURL = "https://localhost:5001/api/";
    let option = "";
    option += arguments[0];
    let id = "";
    if (arguments.length > 1){
        id += arguments[1];
    }
    try{
        let response = await axios.get(baseURL + option + id);
        return response.data;
    }catch(error){
        console.log("ERROR!" + error);
    }
}

export default getFhirJSON;