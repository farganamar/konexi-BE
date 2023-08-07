const { createClient } = require('redis');

let client = {};


// (async () => {
//   client = createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASSWORD,
//     prefix: `user-service-${process.env.NODE_ENV}-`,
//     tls: process.env.REDIS_TLS === 'TRUE' ? {} : undefined,    
//   });

//   client.on("error", (error) => console.error(`Error : ${error}`));

//   await client.connect();
// })();

(async () => {
  if (process.env.REDIS_ENABLE === 'TRUE') {
    client = createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      prefix: `user-service-${process.env.NODE_ENV}-`,
      tls: process.env.REDIS_TLS === 'TRUE' ? {} : undefined,
    });
  
    client.on('connect', () => {
      console.info('redis', 'Client connected to redis...');
    });
  
    client.on('reconnecting', () => {
      console.error('redis', 'reconnecting');
    });
  
    client.on('ready', () => {
      console.info('redis', 'Client ready to redis...');
    });
  
    client.on('warning', (err) => {
      console.error('redis', 'warning', err);
    });
  
    client.on('end', () => {
      console.error('redis', 'end');
    });
  
    client.on('error', (err) => {
      console.error('redis', err);
    });
    await client.connect();
  }
})();


module.exports = client;
