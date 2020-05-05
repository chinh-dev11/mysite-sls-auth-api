const responseBuilder = (status, body) => ({
  statusCode: status,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});

export const success = (body) => responseBuilder(200, body);

export const failure = (status, body) => responseBuilder(status, body);
