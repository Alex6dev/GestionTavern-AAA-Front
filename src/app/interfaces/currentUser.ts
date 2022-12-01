import { PlayerModel } from './player';

export interface CurrentUser {
  connected: boolean;
  player?: PlayerModel;
}
