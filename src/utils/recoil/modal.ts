import { atom } from "recoil";


type ModalName = null | `CommentInput` | "CommentEdit";

export interface Comment {
  comment_id: number;
  like_num: number;
  intra_id: string;
  circle: number;
  user_level: number;
  subject_name: string;
  content: string;
  star_rating: number;
  time_taken: string;
  isComment: boolean;
  difficulty: string;
  bonus: string;
  amount_study: string;
  update_time: string;
}
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
  comment: Comment;
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
