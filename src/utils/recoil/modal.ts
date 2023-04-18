import { atom } from "recoil";

type ModalName = null | `CommentInput` | "CommentEdit";

export interface ModalType {
  isModal: Boolean;
  title?: ModalName;
  content?: JSX.Element | string;
}
export const modalState = atom<ModalType>({
  key: `modalState`,
  default: { isModal: false, title: null },
});

interface CommentInput {
  subjectName: string;
  circle: number;
}

interface CommentEdit {
  subjectName: string;
  circle: number;
  commentId: number;
}

interface Modal {
  modalName: null | string;
  commentInput?: CommentInput;
  commentEdit?: CommentEdit;
}

export const modal = atom<Modal>({
  key: `modal`,
  default: { modalName: null },
});

// export const modalState = atom<Modal>({
//   key: `modalState/${v1()}`,
//   default: { modalName: null },
// });
