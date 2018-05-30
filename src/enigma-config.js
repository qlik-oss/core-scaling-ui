import qixSchema from 'enigma.js/schemas/12.20.0.json';

const backendAdress = process.env.NODE_ENV === 'production' ? `${process.env.BACKEND}/app/doc/Shared-Africa-Urbanization.qvf` : 'localhost:9076';

const config = {
  schema: qixSchema,
  url: `${location.protocol.replace('http', 'ws')}${backendAdress}`,
};

module.exports = config;
