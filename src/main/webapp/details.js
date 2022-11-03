const getDetails = () => {
    const id = Number.parseInt(localStorage.getItem("trainId"));
    alert(id);
    const urlParams = new URLSearchParams(window.location.search);
    const id2 = Number.parseInt(urlParams.get("id"));
};
