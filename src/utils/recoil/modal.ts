import { atom } from "recoil";

type ModalName = null | `CommentInput`;

export interface ModalType {
  isModal: Boolean;
  tilte?: ModalName;
  content?: JSX.Element | string;
}
export const modalState = atom<ModalType>({
  key: `modalState`,
  default: { isModal: false },
});
