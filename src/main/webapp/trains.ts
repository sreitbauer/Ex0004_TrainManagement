const BASE_URL: string = "http://localhost:8080/Ex0004_TrainManagement-1.0-SNAPSHOT/api/trains";

interface Train {
    id: number,
    stations?: string[],
    type: string
}

const getTrains = () => {
    fetch(`${BASE_URL}`)
        .then((response: Response) => {
            return response.json() as Promise<Train[]>
        })
        .then((trains: Train[]) => {
            let html: string = "";
            trains.forEach((train) => html += `<tr><td>${train.id}</td><td>${train.type}</td>
                <td><button class="btn btn-primary" onclick="getDetails(${train.id})">Details</button>
                    <button class="btn btn-primary" onclick="getDetailsURL(${train.id})">Details URL</button></td></tr>`)
            document.getElementById("tblTrains").innerHTML = html;
        });
}

const getDetails = (id: number) => {
    localStorage.setItem("trainId", id.toString());
    window.location.href = "details.html";
}

const getDetailsURL = (id: number) => {
    localStorage.setItem("trainId", id.toString());
    window.location.href = `details.html?id=${encodeURIComponent(id)}`;
}

const getStations = (id: number) => {
  fetch(`${BASE_URL}/${id}`)
      .then((response: Response) => {
        if (response.status == 200) {
            return response.json() as Promise<Train>;
        } else {
            logStatus(response.status, response.statusText);
            return;
        }
      })
      .then((train: Train) => {
          let html: string = "";
          train.stations.forEach((station) => html += `<tr><td>${station}</td></tr>`)
          document.getElementById("tblStations").innerHTML = html;
      });
}

const addTrain = (id: number, type: string) => {
    const train: Train = { id: id, type: type };
    fetch(BASE_URL, { method: "POST", body: JSON.stringify(train), headers: { "Content-Type": "application/json" }})
        .then((response: Response) => {
            if (response.status === 201) {
                getTrains();
                alert(response.headers.get("Location"));
            } else {
                logStatus(response.status, response.statusText);
            }
        });
}

const addStation = (id: number, station: string) => {
    fetch(`${BASE_URL}/${id}?station=${station}`, { method: "POST" })
        .then((response: Response) => {
            logStatus(response.status, response.statusText);
        });
}

const logStatus = (code: number, status: string): void => alert(`${code}: ${status}`);