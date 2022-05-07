import { parseISO, formatDistanceToNowStrict } from "date-fns";

import ko from "date-fns/locale/ko";
const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNowStrict(date, { locale: ko });
    timeAgo = `${timePeriod} 전`;
  }

  return <p title={timestamp}>{timeAgo}</p>;
};
export default TimeAgo;
