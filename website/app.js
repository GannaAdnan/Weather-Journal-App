// Personal API Key for OpenWeatherMap API

const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='8b8e5197d7c7d0a9485bdd3bee73017d';

//Assigning DIVs Properties to the div 'entryholder'  Dynamically


// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', PREACTION);

/* Function called by event listener */

function PREACTION(e)
{
    let d = new Date();
    let newDate = (d.getMonth()+1)+ '/' + d.getDate() + '/' + d.getFullYear()+' '; 
    let time= (d.getHours())+' : '+(d.getMinutes())+' : '+(d.getSeconds()+' UTC');
 
    const zipCode= document.getElementById("zip").value;
    getWeather(baseURL,zipCode,apiKey)

    .then(function(data){
        console.log(data);
        postData('/add',{
          temp: ((data.main.temp-273.15)-(data.main.temp-273.15)%2)+'<span style="font-size:100px;">&#8728;</span>', 
          weather: data.weather[0].main, weathericon: data.weather[0].icon, weatherdesc: data.weather[0].description,
          templike:('Feels Like: '+ ((data.main.feels_like-273.15)-(data.main.feels_like-273.15)%2)+'<span style="font-size:28px;">&#8728;</span>'), pressure: data.main.pressure, humidity: data.main.humidity, windspeed: data.wind.speed, 
          winddeg: data.wind.deg, cloud: data.clouds.all, sunrise: data.sys.sunrise, sunset: data.sys.sunset, 
          country:( data.name+', '+data.sys.country+".  "), date: newDate, timezone:time });
        updateUI('/all'); 
    });
}

/* Function to GET Web API Data*/

const getWeather = async (baseURL, zip, apiKey)=>{

  const res= await fetch(baseURL+zip+'&APPID='+apiKey)
    try{
        const data = await res.json();
        return data;

      }  catch(error) {

        console.log("error", error);
        
      };
};

/* Function to POST data */

const postData = async ( url = '', data = {})=>{

    console.log(data)
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },

      body: JSON.stringify(data),   

    });
  
      try {
        const newData = await response.json();
        return newData;

      } catch(error) {
          console.log("error", error);
      };
  };

/* Function to GET Project Data */

const updateUI = async(url='')=>{
  const request = await fetch(url);
  
    try{

        const alldata = await request.json();
        document.getElementById('date').innerHTML= alldata[0].date;
        document.getElementById('temp').innerHTML= alldata[0].temp;
        document.getElementById("country").innerHTML= alldata[0].country;
        document.getElementById("windspeed").innerHTML= alldata[0].windspeed;
        document.getElementById("winddeg").innerHTML= alldata[0].winddeg;
        document.getElementById("templike").innerHTML= alldata[0].templike;
        document.getElementById("weather").innerHTML= alldata[0].weather;
      //  document.getElementById("weathericon").innerHTML= alldata[0].weathericon;
        document.getElementById("weatherdesc").innerHTML= alldata[0].weatherdesc;
        document.getElementById("timezone").innerHTML= alldata[0].timezone;
        document.getElementById("pressure").innerHTML= alldata[0].pressure;
        document.getElementById("humidity").innerHTML= alldata[0].humidity;
        document.getElementById("cloud").innerHTML= alldata[0].cloud;
        document.getElementById("sunrise").innerHTML= alldata[0].sunrise;
        document.getElementById("sunset").innerHTML= alldata[0].sunset;


    } catch(error){
        console.log("error", error);
    }
}

