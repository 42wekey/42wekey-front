import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../utils/recoil/modal";
import CommentInput from "../subject_detail/comment_input/CommentInput";
import CommentInputModal from "./CommentInputModal";

export default function Modal() {
  const [isCommentModal, setIsCommnetModal] = useRecoilState(modalState);
//   useEffect(() => {
//     if (isCommentModal.isModal) document.body.style.overflow = "hidden";
//     else if (!isCommentModal.isModal) document.body.style.overflow = "unset";
//   }, [isCommentModal.isModal]);

  return (
    isCommentModal.isModal && (
      <div>
        {" "}
        <CommentInputModal subject="libft" />
      </div>
    )
  );
}
