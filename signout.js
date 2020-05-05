import { Auth } from 'aws-amplify';
import fetch from 'node-fetch';
import { success } from './libs/response-lib';
import { confAuth } from './conf';

global.fetch = fetch;

exports.main = async (event, context) => {
  const isOffline = process.env.IS_LOCAL || /localhost/.test(event.headers.Host);
  const paramProps = {
    userPoolId: 'USER_POOL_ID',
    userPoolWebClientId: 'USER_POOL_CLIENT_ID',
  };

  if (isOffline) {
    paramProps.userPoolId = `${paramProps.userPoolId}_LOCAL`;
    paramProps.userPoolWebClientId = `${paramProps.userPoolWebClientId}_LOCAL`;
  }

  confAuth(paramProps.userPoolId, paramProps.userPoolWebClientId);

  try {
    // const payload = JSON.parse(event.body);
    const user = await Auth.currentAuthenticatedUser();
    console.log('user: ', user);
    // const data = await Auth.signOut();

    return success(user);
    /* .then(async user => {
      console.log('user: ', user);
      const data = await Auth.signOut();
      // const data = await Auth.signOut({ global: true}); // from all devices, AWS credentials remains valid until expire (1h by default)

      return success({
        accessToken: data.signInUserSession.accessToken.jwtToken,
        refreshToken: data.signInUserSession.refreshToken.token,
      });
    })
    .catch(e => {
      console.log(e);
      return success({
        code: e.code,
        message: e.message,
      });
    }) */
  } catch (e) {
    return success({
      code: e.code,
      message: e.message,
    });
  }
};
