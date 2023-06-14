import { atom } from 'recoil';

export const errorState = atom<string>({
  key: `erroreState/`,
  default: ''
});
