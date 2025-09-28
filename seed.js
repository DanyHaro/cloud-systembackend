// seed.js
const mysql = require('mysql2/promise');
const { fakerES: faker } = require('@faker-js/faker');

(async () => {
  const conn = await mysql.createConnection({ host:'localhost', user:'root', password:'123', database:'cloud_matriculadb' });

  faker.seed(123); // reproducible
  const carreras = ['Ingeniería Industrial','Ingeniería de Sistemas','Ingeniería Civil','Arquitectura','Administración y Negocios Internacionales','Contabilidad', 'Enfermería'];
  const cursos = ['Programación I','Cálculo I','Física I','Química General','Contabilidad General','Diseño Arquitectónico I'];
  const ciclos = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];


  const N = 1000;           // cantidad a generar
  const BATCH = 200;        // tamaño de lote

  const rows = [];
  for (let i=0;i<N;i++){
    const nombre  = faker.person.firstName();
    const apellido= faker.person.lastName();
    const codigo  = `A${faker.number.int({min:20200000,max:20259999})}`;
    const ciclo   = faker.helpers.arrayElement(ciclos);
    const carrera = faker.helpers.arrayElement(carreras);
    const curso   = faker.helpers.arrayElement(cursos);
    rows.push([nombre, apellido, codigo, ciclo, carrera, curso]);
  }

  const sql = `
    INSERT INTO matricula (nombre, apellido, codigo_alumno, ciclo, carrera_profesional, curso)
    VALUES ?
  `;

  // insertar por lotes
  for (let i=0;i<rows.length;i+=BATCH){
    const slice = rows.slice(i,i+BATCH);
    await conn.query(sql, [slice]);
  }

  await conn.end();
  console.log(`Insertados ${N} registros sintéticos`);
})();
