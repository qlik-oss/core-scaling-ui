import qixSchema from 'enigma.js/schemas/12.20.0.json';

const backendAdress = process.env.NODE_ENV === 'production' ? `${process.env.BACKEND}/app/doc/5f5f03fe-00f3-4a4b-ac52-db32152a7e44` : 'localhost:9176';

const enigmaConfig = {
  schema: qixSchema,
  url: `${window.location.protocol.replace('http', 'ws')}${backendAdress}`,
};

export default enigmaConfig;
