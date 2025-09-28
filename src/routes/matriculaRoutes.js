const express = require('express');
const router = express.Router();
const db = require('../db');

/*Crear*/
router.post('/', (req, res) => {
  const { nombre, apellido, codigo_alumno, ciclo, carrera_profesional, curso } = req.body;
  const sql = 'INSERT INTO matricula (nombre, apellido, codigo_alumno, ciclo, carrera_profesional, curso) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [nombre, apellido, codigo_alumno, ciclo, carrera_profesional, curso], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Matrícula registrada', id: result.insertId });
  });
});

/* Listar */
router.get('/', (req, res) => {
  db.query('SELECT * FROM matricula', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

/* Obtener por ID*/
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM matricula WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).send(err);
    if (rows.length === 0) return res.status(404).json({ message: 'Matrícula no encontrada' });
    res.json(rows[0]);
  });
});

/* Actualizar */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, codigo_alumno, ciclo, carrera_profesional, curso } = req.body;

  // Verificar existencia
  db.query('SELECT id FROM matricula WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).send(err);
    if (rows.length === 0) return res.status(404).json({ message: 'Matrícula no encontrada' });

    const sql = `
      UPDATE matricula
      SET nombre = ?, apellido = ?, codigo_alumno = ?, ciclo = ?, carrera_profesional = ?, curso = ?
      WHERE id = ?
    `;
    db.query(sql, [nombre, apellido, codigo_alumno, ciclo, carrera_profesional, curso, id], (err2) => {
      if (err2) return res.status(500).send(err2);
      res.json({ message: 'Matrícula actualizada' });
    });
  });
});

/* Eliminar */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM matricula WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Matrícula no encontrada' });
    }
    res.json({ message: 'Matrícula eliminada' });
  });
});

module.exports = router;