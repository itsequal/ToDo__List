var ws = new WebSocket("ws://localhost:3000/");
document.getElementById("btnAdd").addEventListener("click", () => {
    let tit, des, fec, aut;
    tit = document.getElementById("title").value;
    des = document.getElementById("description").value;
    fec = document.getElementById("date").value;
    aut = document.getElementById("author").value;
    
    if (tit == "" || des == "" || fec == "" || aut == "") {
        alert("No se llenaron todos los espacios");
    } else {
        var data = {
            Titulo: tit,
            Descripcion: des,
            Fecha: fec,
            Autor: aut
        }
        fetch('http://localhost:1339/tarea/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .catch(error => console.log(error))
            .then(json => ws.send("AP"))
            
        alert("Nueva actividad agregada");
    }
});