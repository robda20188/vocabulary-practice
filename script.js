document.getElementById("crear").addEventListener("click", () => {
    document.getElementById("formulario").style.display = "flex";
    document.getElementById("inicio").style.display = "none";
})

document.getElementById("titulo").addEventListener("click", () => {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("inicio").style.display = "flex";
})
