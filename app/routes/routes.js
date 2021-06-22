module.exports = app => {
    const tarea = require('../controllers/controller.js');
    app.post('/tarea', tarea.create);
    app.get('/tarea', tarea.getAll);
   // app.get('/tarea/:tareaTitulo', tarea.findByTitle);
    app.get('/tarea/zero', tarea.findByStatus0);
    //app.put('/tarea/:tareaId', tarea.modifyById);
    app.delete('/tarea/:tareaTitulo', tarea.delete);
    app.put('/tarea/:tareaTitulo', tarea.extra);
    // app.delete('/tarea/:tareaTitulo', tarea.remove);
}