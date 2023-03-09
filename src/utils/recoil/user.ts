import { atom } from 'recoil';

interface userProfile{
  intraId: string;
  lastReloadTime: number;
  level: number;
}

export const profileState = atom<userProfile>({
  key: `profileState/`,
  default: {
    intraId: 'him',
    lastReloadTime: 20220322,
    level: 0,
  },
});



