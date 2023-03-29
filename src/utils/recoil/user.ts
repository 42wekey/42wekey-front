import { atom } from 'recoil';

interface userProfile{
  intraId: string;
  user_level: number;
}

export const profileState = atom<userProfile>({
  key: `profileState/`,
  default: {
    intraId: "null",
    user_level: 0,
  },
});



