window.addEventListener("load", () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let loc_lat = document.querySelector("#lat");
    let loc_lon = document.querySelector("#lon");
    const degreeSection = document.querySelector(".degree-section");
    const sp = document.querySelector(".degree-section .unit");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(obj => {
            long = obj.coords.longitude;
            lat = obj.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            
            loc_lat.textContent = lat;
            loc_lon.textContent = long;

            const api = `${proxy}https://api.darksky.net/forecast/f31087c0687bf19e35e343411938e4c1/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    const celcius = (temperature - 32) * (5 / 9);
                    //set DOM elements from api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //set icon
                    setIcons(icon, document.querySelector('.icon'));

                    degreeSection.addEventListener("click", () => {
                        if (sp.textContent === "F") {
                            temperatureDegree.textContent = celcius.toFixed(2);
                            sp.textContent = "C";
                        } else {
                            temperatureDegree.textContent = temperature;
                            sp.textContent = "F";
                        }
                    });
                });

        });

    }

    function setIcons(icon, iconID) {

        const skycons = new Skycons({ color: "white" });

        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});