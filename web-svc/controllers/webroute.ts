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

  const apiUrl: string = cfg.asp_endpoint;
  return new Promise<QRCodeRes>((resolve, reject): void => {
    axios.post(apiUrl, content).then((rs: AxiosResponse) => {
      resolve(rs.data as QRCodeRes);
    }).catch(reject);
  });
};
