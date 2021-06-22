var ws = new WebSocket("ws://localhost:3000/");
loadComplete();
loadPending();

 ws.onmessage =  function(e) {
    console.log(e);
    if (e.data == 'AP') {
        loadPending();  
    }
    if (e.data == 'AC') {
        loadComplete();
        loadPending();  
    }
};

function loadComplete(){
    fetch('http://localhost:1339/tarea/zero')
    .then(response=>response.json())
    .catch(error => console.log(error))
    .then(json=>{
        let ins = document.getElementById("ACom");
        ins.innerHTML="";
        json.forEach(element => {
            ins.innerHTML+=`
            <div class="container">
  <div class="card__container">
    <div class="card">
      <div class="card__content">
        <h3 class="card__header">${element.Titulo}</h3>
        <p class="card__info">Descripcion: ${element.Descripcion}<br>Fecha: ${element.Fecha}<br>Autor: ${element.Autor}<br>Extra: ${element.Extra}</p>
            <br><br>
        </div>
    </div>
  </div>
</div>
            <br>`;
        }
        );
    })
}

function loadPending(){
    fetch('http://localhost:1339/tarea')
    .then(response=>response.json())
    .catch(error => console.log(error))
    .then(json=>{
        let ins = document.getElementById("APen");
        ins.innerHTML="";
        console.log("EL JSONNNNNNNNNNNNN", json);
        
        json.forEach(element => {
            ins.innerHTML+=`
            <div>
            <div class="container" >
  <div class="card__container">
    <div class="card" >
      <div class="card__content">
        <h3 class="card__header" ">${element.Titulo}</h3>
        <p class="card__info">Descripcion: ${element.Descripcion}<br>Fecha: ${element.Fecha}<br>Autor: ${element.Autor}</p>
        <button class="card__button" id="${element.Titulo}" onclick="borrar(${element.Titulo})">Completar</button>
      </div>
    </div>
  </div>
</div>
</div>
            <br>`;
        }   
        );

    })
    
}

function borrar(titulo){
        console.log("del html ", titulo);
        let data = {Titulo:titulo.id};
        console.log(data);
        fetch(`http://localhost:1339/tarea/${data.Titulo}`, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(json => ws.send("AC"))
        
        loadComplete();
        loadPending();
}
