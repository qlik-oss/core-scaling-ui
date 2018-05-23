import qixSchema from 'enigma.js/schemas/12.20.0.json';

const config = {
  schema: qixSchema,
  url: `${location.protocol.replace('http', 'ws')}//scalingbackend.qlikcore.com/app/doc/Shared-Africa-Urbanization.qvf`,
};


module.exports = config;
