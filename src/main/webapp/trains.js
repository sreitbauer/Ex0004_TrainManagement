const BASE_URL = "http://localhost:8080/Ex0004_TrainManagement-1.0-SNAPSHOT/api/trains";
const getTrains = () => {
    fetch(`${BASE_URL}`)
        .then((response) => {
        return response.json();
    })
        .then((trains) => {
        let html = "";
        trains.forEach((train) => html += `<tr><td>${train.id}</td><td>${train.type}</td>
                <td><button class="btn btn-primary" onclick="getDetails(${train.id})">Details</button>
                    <button class="btn btn-primary" onclick="getDetailsURL(${train.id})">Details URL</button></td></tr>`);
        document.getElementById("tblTrains").innerHTML = html;
    });
};
const getDetails = (id) => {
    localStorage.setItem("trainId", id.toString());
    window.location.href = "details.html";
};
const getDetailsURL = (id) => {
    localStorage.setItem("trainId", id.toString());
    window.location.href = `details.html?id=${encodeURIComponent(id)}`;
};
const getStations = (id) => {
    fetch(`${BASE_URL}/${id}`)
        .then((response) => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            logStatus(response.status, response.statusText);
            return;
        }
    })
        .then((train) => {
        let html = "";
        train.stations.forEach((station) => html += `<tr><td>${station}</td></tr>`);
        document.getElementById("tblStations").innerHTML = html;
    });
};
const addTrain = (id, type) => {
    const train = { id: id, type: type };
    fetch(BASE_URL, { method: "POST", body: JSON.stringify(train), headers: { "Content-Type": "application/json" } })
        .then((response) => {
        if (response.status === 201) {
            getTrains();
            alert(response.headers.get("Location"));
        }
        else {
            logStatus(response.status, response.statusText);
        }
    });
};
const addStation = (id, station) => {
    fetch(`${BASE_URL}/${id}?station=${station}`, { method: "POST" })
        .then((response) => {
        logStatus(response.status, response.statusText);
    });
};
const logStatus = (code, status) => alert(`${code}: ${status}`);
