export interface Player {
  id?: number;
  email: string;
  nickname?: string;
  password: string;
  matchingPassword: string;
  enabled?: boolean;
}
export interface PlayerModel {
  id?: number;
  email: string;
  nickname: string;
  password: string;
  enabled?: boolean;
  roles: [];
}
