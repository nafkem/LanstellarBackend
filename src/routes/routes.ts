
import { Application } from "express";
import { Authentication } from "../controller/auth.service";
import { authenticateAPIKey } from "../middlewares/auth_header";


import { UserData } from "../controller/user.service";

export class Controller {

  private authService: Authentication;
  private userData:UserData;



  constructor(private app: Application
    ) {
    this.authService = new Authentication();
    this.userData=new UserData();

    this.routes();
  }

  public routes() {
    
    //for authentication routes
    this.app.route("/").get( this.authService.Welcome);
    this.app.route("/api").get( this.authService.Welcome);
    this.app.route("/api/register").post(authenticateAPIKey,this.authService.Register);
    this.app.route('/api/selfie').post(authenticateAPIKey, this.authService.Selfie);
    this.app.route("/api/login").post(authenticateAPIKey, this.authService.Login);
    this.app.route("/api/forgot_password").post(authenticateAPIKey, this.authService.ForgotPassword);
    this.app.route("/api/reset_password").post(authenticateAPIKey, this.authService.ResetPassword);
    this.app.route("/api/otp").post(authenticateAPIKey, this.authService.ActivateUserByOTP);
    this.app.route("/api/setup_pin").post(authenticateAPIKey,  this.authService.SetPin);
    this.app.route("/api/setup_app_pin").post(authenticateAPIKey,  this.authService.SetAppPin);
    this.app.route("/api/verify_app_pin").post(authenticateAPIKey,  this.authService.VerifyAppPin);


    //users
    this.app.route("/api/match_phone_records").post(authenticateAPIKey, this.userData.MatchUsersToPhonebook);
    this.app.route("/api/save_beneficiary").post(authenticateAPIKey, this.userData.SaveABeneficiary);
    this.app.route("/api/get_beneficiaries/:id").get(authenticateAPIKey, this.userData.GetBeneficiary);
    this.app.route("/api/get_transactions/:id").get(authenticateAPIKey, this.userData.GetTransaction);
    this.app.route("/api/get_tbill_transactions/:id").get(authenticateAPIKey, this.userData.GetTbillTransaction);
    this.app.route("/api/save_transfer").post(authenticateAPIKey, this.userData.SaveTransferHistory);


  }
}