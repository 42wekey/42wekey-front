import moment from "moment";
import { useEffect } from "react";

interface Time {
  title: string;
  time: string;
}

export function ConvertTime(isoTime: Time) {
  const now = moment();
  const time = moment(isoTime.time);
  let diffMinutes = now.diff(time, "minutes");

  //   useEffect(()=>{
  // 	if (diffMinutes)
  // 		console.log(diffMinutes);
  //   },[diffMinutes])
  if (isoTime.title === "myPage") {
    return time.format("YYYY. MM. DD.");
  } else if (diffMinutes < 3) {
    return "방금 전";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffMinutes < 1440) {
    diffMinutes = now.diff(time, "hour");
    return `${diffMinutes}시간 전`;
  } else if (diffMinutes < 10080) {
    diffMinutes = now.diff(time, "day");
    return `${diffMinutes}일 전`;
  } else {
    return time.format("YYYY. MM. DD.");
  }
}

// import moment from 'moment';

// function getTimeAgo(isoTime) {
//   const now = moment();
//   const time = moment(isoTime);
//   const diffMinutes = now.diff(time, 'minutes');

//   if (diffMinutes < 1) {
//     return '방금 전';
//   } else if (diffMinutes < 10) {
//     return `${diffMinutes}분 전`;
//   } else {
//     return time.format('YYYY년 MM월 DD일 HH:mm:ss');
//   }
// }

// // 사용 예시
// const isoTime = '2022-04-20T12:34:56Z';
// const timeAgo = getTimeAgo(isoTime); // "1분 전"
