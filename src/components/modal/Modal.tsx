import { useRecoilState } from "recoil"
import { modalState } from "../../utils/recoil/modal"
import CommentInput from "../subject_detail/comment_input/CommentInput";
import CommentInputModal from "./CommentInputModal";

export default function Modal() {
	const [isCommentModal, setIsCommnetModal] = useRecoilState(modalState);

	return (isCommentModal.isModal && (<div> <CommentInputModal subject="libft"/></div>))
}