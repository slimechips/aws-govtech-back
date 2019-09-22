import { Response, Request, Router } from 'express'; // eslint-disable-line
import { NextFunction } from 'connect';
import { cfg } from 'f10-util/configs';
import axios from 'f10-util/axios';
import { AxiosResponse } from 'axios';
import { QRCodeRes } from '../models/QRCodeRes.model';

// Init router here
export const router = Router();

export const getLogin = (req: Request, res: Response, next: NextFunction): void => {
  _getQrCode().then((qrCodeRes: QRCodeRes) => {
    res.status(200).json(qrCodeRes);
  }).catch((err: Error) => next({ err }));
};

export const pollLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { auth_req_id: authReqId } = req.query;
  _startPoll(authReqId).then((rs: object) => {
    res.status(200).json(rs);
  }).catch((err: Error) => next({ err }));
};

const _getQrCode = (): Promise<QRCodeRes> => {
  const nonce = 'hardcoded-nonce';
  const content = {
    client_id: cfg.client_id,
    client_secret: cfg.client_secret,
    scope: 'openid',
    display: 'qrcode',
    nonce,
    redirect_uri: '',
    mode: 'all',
  };

  const apiUrl = `${cfg.asp_endpoint}/di-auth`;
  return new Promise<QRCodeRes>((resolve, reject): void => {
    axios.post(apiUrl, content).then((rs: AxiosResponse) => {
      resolve(rs.data as QRCodeRes);
    }).catch(reject);
  });
};

const _startPoll = (authReqId: string): Promise<object> => {
  let counter = 0;
  return new Promise<object>((resolve, reject): void => {
    const poll: NodeJS.Timeout = setInterval(() => {
      _pollForLogin(authReqId)
        .then((data: object) => {
          clearInterval(poll);
          resolve(data);
        })
        .catch((err: Error) => {
          counter += 1;
          if (counter > 20) {
            clearInterval(poll);
            reject(err);
          }
        });
    }, 2000);
  });
};

const _pollForLogin = (authReqId: string): Promise<object> => {
  const apiUrl = `${cfg.asp_endpoint}/token`;
  const content = {
    client_id: cfg.client_id,
    client_secret: cfg.client_secret,
    auth_req_id: authReqId,
    grant_type: 'direct_invocation_request',
  };
  return new Promise<object>((resolve, reject): void => {
    axios.post(apiUrl, content).then((rs: AxiosResponse) => {
      resolve(rs.data);
    }).catch(reject);
  });
};
