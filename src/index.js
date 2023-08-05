require('dotenv').config()


console.log('interface:', process.env.INTERFACE);

switch (process.env.INTERFACE) {
  case 'rest':
    require('./interfaces/http')
    break;

  default:
    break;
}