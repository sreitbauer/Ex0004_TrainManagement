const getDetails = () => {
    const id: number = Number.parseInt(localStorage.getItem("trainId"));
    alert(id);

    const urlParams = new URLSearchParams(window.location.search);
    const id2: number = Number.parseInt(urlParams.get("id"));
}