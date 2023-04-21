import moment from "moment";
import { useEffect } from "react";

interface Time {
	title: string;
	time: string;
}

export function ConvertTime(isoTime: Time) {
  const now = moment();
  const time = moment(isoTime.time);
  const diffMinutes = now.diff(time, "minutes");

//   useEffect(()=>{
// 	if (diffMinutes)
// 		console.log(diffMinutes);
//   },[diffMinutes])
  console.log(diffMinutes, isoTime.time);

    if (diffMinutes < 1) {
    return '방금 전';
  } else if (diffMinutes < 10) {
    return `${diffMinutes}분 전`;
  } else {
    return time.format('YYYY년 MM월 DD일 HH:mm:ss');
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
