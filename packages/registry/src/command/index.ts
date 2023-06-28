import logger from '../logger';
import { request_get, request_post } from '../utils';
import { getDetailUrl, CENTER_PUBLISH_URL, REMOVE_URL } from './constants';

export { default as login, generateToken, resetToken } from './login';
export { default as getToken } from './get-token';
export { default as publish } from './publish';

export const list = async (token: string) => {
  const { ResponseId, Response } = await request_post(CENTER_PUBLISH_URL, {
    safety_code: token,
  });
  logger.debug(`Get registry list responseId: ${ResponseId}`);

  if (Response.Error) {
    throw new Error(`${Response.Error}: ${Response.Message}`);
  }

  return Response;
};

export const detail = async (name: string) => {
  const url = getDetailUrl(name);
  const { ResponseId, Response } = await request_get(url);
  logger.debug(`Get registry ${name} detail responseId: ${ResponseId}`);
  return Response;
};

export const remove = async (token: string, name: string, type: string, version: string) => {
  const { ResponseId, Response } = await request_post(REMOVE_URL, {
    safety_code: token,
    package_name: name,
    package_type: type,
    package_version: version,
  });
  logger.debug(`Remove registry ${name} responseId: ${ResponseId}`);
  if (Response.Error) {
    throw new Error(`${Response.Error}: ${Response.Message}`);
  }
};
