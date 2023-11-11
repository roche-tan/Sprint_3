import * as http from 'http';

const options = {
  hostname: 'localhost',
  port: 8000, // Puerto en el que escucha tu servidor HTTP
  path: './',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Estado: ${res.statusCode}`);

  res.on('data', (data) => {
    console.log('Recibido:', data.toString());
  });

  res.on('end', () => {
    console.log("La respuesta ha terminado");
  });
});

req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

req.end(); // Finaliza y envía la solicitud
