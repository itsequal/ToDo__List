const sql = require('../database/mysql.js');

const Tarea = function(tarea){
    this.titulo = tarea.titulo;
    this.descripcion = tarea.descripcion;
    this.fecha = tarea.fecha;
    this.autor = tarea.autor;
    this.estado = 1;
    this.extra = "";
};

Tarea.create = (newTarea, result) => {
    sql.query('INSERT INTO list SET ?', newTarea, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          };
          console.log('nueva tarea ', {title: res.insertTitle, ...newTarea});
          result(null, {title: res.insertTitle, ...newTarea});
    });
};

Tarea.extra = (titulo, extra, result) => {
  sql.query('UPDATE list SET Extra=? WHERE Titulo = ?', [extra,titulo],  (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        };
        console.log('nueva info', {extra});
        result(null, {extra});
  });
};

Tarea.getAll = result => {
    sql.query('SELECT * FROM list WHERE estado = 1', (err,rows,res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          };
          console.log("Lista: ", rows);
          result(null, rows);
    });
};
Tarea.findByStatus0 = result => {
  sql.query('SELECT * FROM list WHERE estado = 0', (err,res) =>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        };
        console.log("Lista: ", res);
        result(null, res);
  });
};
Tarea.remove = (titulo, result) =>{
    sql.query('DELETE FROM list WHERE titulo = ?', titulo, (err,res) =>{
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
          console.log('tarea borrada: ', titulo);
          result(null, res);
    });
};

Tarea.findByTitle = (titulo, result) => {
    sql.query(`SELECT * FROM list WHERE titulo = ${titulo}`, (err,res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("titulo encontrado en: ", res[0]);
            result(null, res[0]);
            return;
          }
          result({ kind: "not_found" }, null);

    });
};



Tarea.modifyById = (id, tarea, result) =>{
    sql.query('UPDATE list SET titulo = ?, descripcion = ?, fecha = ?, autor = ? WHERE id = ?',
    [tarea.titulo, tarea.descripcion, tarea.fecha, tarea.autor, id], (err,res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("Tarea actualizada: ", { id: id, ...tarea });
          result(null, { id: id, ...tarea });
    }
    );
};
Tarea.delete = (titulo, result) =>{
    sql.query('UPDATE list SET estado = 0 WHERE Titulo = ?', [titulo], (err,res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("Tarea actualizada: ", { titulo:titulo});
          result(null,res);
    });
};

module.exports = Tarea;