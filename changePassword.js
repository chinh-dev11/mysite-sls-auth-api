import { Auth } from 'aws-amplify';
import fetch from 'node-fetch';
import { success } from './libs/response-lib';
import { confAuth } from './conf';

global.fetch = fetch;

/**
 * Required payload:
    {
      old_password: 'xxx',
      new_password: 'xxx'
    }
 */
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
    const payload = JSON.parse(event.body);
    const user = await Auth.currentAuthenticatedUser();
    const data = await Auth.forgotPassword(user, payload.old_password, payload.new_password);
    console.log('data: ', data);

    return success(data);
  } catch (e) {
    return success({
      code: e.code,
      message: e.message,
    });
  }
};
