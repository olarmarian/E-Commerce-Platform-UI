import LoginCredentialsModel from './login-credentials.model';

export default interface LoginRequestModel {
  readonly credentials: LoginCredentialsModel;
}
