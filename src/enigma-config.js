import qixSchema from 'enigma.js/schemas/12.20.0.json';

const config = {
  schema: qixSchema,
  //   url: 'ws://localhost:9076/app/Africa',
  url: 'ws://localhost:9076',
  suspendOnClose: true,
  interceptors: [
    {
      onRejected(session, request, error) {
        if (error.code === 15) {
          return request.retry();
        }
        return Promise.reject(error);
      },
    },
  ],
};

module.exports = config;
