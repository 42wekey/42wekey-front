import { atom } from 'recoil';

interface userProfile{
  isLogin: boolean;
  intra_id?: string;
  level?: number;
}

export const profileState = atom<userProfile>({
  key: `profileState/`,
  default: {
    isLogin: false,
    intra_id: "null",
    level: 0,
  },
});



