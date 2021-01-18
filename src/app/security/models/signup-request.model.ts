import { AuthCredentialsModel } from './auth-credentials.model';

export interface SignUpRequestModel {
  readonly credentials: AuthCredentialsModel;
}
