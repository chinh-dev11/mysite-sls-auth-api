/* eslint-disable import/prefer-default-export */
import Amplify from 'aws-amplify';

export const confAuth = (userPoolId, userPoolWebClientId) => {
  Amplify.configure({
    Auth: {
      userPoolId: process.env[userPoolId],
      userPoolWebClientId: process.env[userPoolWebClientId],
    },
  });
};
