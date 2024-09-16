import { Request, Response, NextFunction } from 'express';
import { CONSTANTS } from '../config/constants';
import { Register } from './auth/register';
import { Login } from './auth/login';
import { activateUser } from './auth/activate_user';
import { ResetUserPassword } from './auth/reset'
import { forgotPassword } from './auth/forgot_password';
import { SetUserPin } from './auth/user_pin';

import { Selfie } from './auth/selfie';
import { SetUserAppLockPin } from './auth/user_applock_pin';
import { VerifyUserAppLockPin } from './auth/verify_applock_pin';
export class Authentication {

  public Register = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {
      let data = await Register(req.body);

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };





  public Login = async (req: Request, res: Response) => {

    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {
      let data = await Login(req.body);
      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }

  public ActivateUserByOTP = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }

    try {
      let data = await activateUser(req.body);

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }




  public ResetPassword = async (req: Request, res: Response) => {

    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {

      let data = await ResetUserPassword(req.body);

      res.send(data)
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }

  public SetPin = async (req: Request, res: Response) => {

    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {

      let data = await SetUserPin(req.body);

      res.send(data)
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }


  public SetAppPin = async (req: Request, res: Response) => {

    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {

      let data = await SetUserAppLockPin(req.body);

      res.send(data)
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }

  public VerifyAppPin = async (req: Request, res: Response) => {

    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {

      let data = await VerifyUserAppLockPin(req.body);

      res.send(data)
    } catch (err) {
      res.status(500).json({ error: err});
    }

  }

  public ForgotPassword = async (req: Request, res: Response) => {

    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {

      let data = await forgotPassword(req.body);

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }



  public Welcome = async (req: Request, res: Response) => {

    res.send(CONSTANTS.MESSAGES.LIVE);
  }


  public Selfie = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {

      let data = await Selfie(req.body);

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }
}

