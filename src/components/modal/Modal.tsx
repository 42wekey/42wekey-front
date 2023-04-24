import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { modal, modalState } from "../../utils/recoil/modal";
import CommentInput from "../subject_detail/comment_input/CommentInput";
import CommentInputModal from "./CommentInputModal";
import CommentEditModal from "./CommentEditModal";

export default function Modal() {
  const [{ modalName, commentInput, commentEdit }, setModal] =
    useRecoilState(modal);
  const content: { [key: string]: JSX.Element | null } = {
    commentInput: <CommentInputModal />,
    commentEdit: <CommentEditModal />
  };

  return modalName ? <div>{content[modalName]}</div> : <></>;
}
//   useEffect(() => {
//     if (isCommentModal.isModal) document.body.style.overflow = "hidden";
//     else if (!isCommentModal.isModal) document.body.style.overflow = "unset";
//   }, [isCommentModal.isModal]);

// export default function ModalProvider() {
//   const [
//     {
//       modalName,
//       cancel,
//       enroll,
//       manual,
//       announcement,
//       exp,
//       intraId,
//       detailContent,
//       feedback,
//       userId,
//     },
//     setModal,
//   ] = useRecoilState(modalState);
//   const setReloadMatch = useSetRecoilState(reloadMatchState);
//   const content: { [key: string]: JSX.Element | null } = {
//     'EVENT-ANNOUNCEMENT': announcement ? (
//       <AnnouncementModal announcement={announcement} />
//     ) : null,
//     'MENU-REPORT': <ReportModal />,
//     'MENU-LOGOUT': <LogoutModal />,
//     'MATCH-REJECT': <MatchRejectModal />,
//     'MATCH-ENROLL': enroll ? <MatchEnrollModal {...enroll} /> : null,
//     'MATCH-CANCEL': cancel ? <MatchCancelModal {...cancel} /> : null,
//     'MATCH-MANUAL': manual ? <MatchManualModal {...manual} /> : null,
//     'USER-PROFILE_EDIT': <EditProfileModal />,
//     'FIXED-AFTER_GAME': <AfterGameModal />,
//     'FIXED-STAT': <StatChangeModal {...exp} />,
//     'ADMIN-PROFILE': userId ? <AdminProfileModal value={userId} /> : null,
//     'ADMIN-PENALTY': intraId ? <AdminPenaltyModal value={intraId} /> : null,
//     'ADMIN-NOTI_ALL': <AdminNotiAllModal />,
//     'ADMIN-NOTI_USER': intraId ? <AdminNotiUserModal value={intraId} /> : null,
//     'ADMIN-CHECK_FEEDBACK': feedback ? (
//       <AdminCheckFeedback {...feedback} />
//     ) : null,
//     'ADMIN-DETAIL_CONTENT':
//       intraId && detailContent ? (
//         <FeedbackDetailModal intraId={intraId} detailContent={detailContent} />
//       ) : null,
//   };

//   useEffect(() => {
//     setModalOutsideScroll();
//   }, [modalName]);

//   const setModalOutsideScroll = () =>
//     (document.body.style.overflow = modalName ? 'hidden' : 'unset');

//   const closeModalHandler = (e: React.MouseEvent) => {
//     if (modalName?.split('-')[0] === 'FIXED') return;
//     if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
//       if (modalName === 'MATCH-CANCEL') setReloadMatch(true);
//       setModal({ modalName: null });
//     }
//   };

//   return (
//     modalName && (
//       <div
//         className={styles.backdrop}
//         id='modalOutside'
//         onClick={closeModalHandler}
//       >
//         <div className={styles.modalContainer}>{content[modalName]}</div>
//       </div>
//     )
//   );
// }
