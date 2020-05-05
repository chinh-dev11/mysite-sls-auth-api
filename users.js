import { success } from './libs/response-lib';

exports.main = async (event, context) => success({
  message: 'Cognito user list',
});
