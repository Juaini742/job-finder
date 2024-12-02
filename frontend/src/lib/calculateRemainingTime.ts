import { formatDistanceToNowStrict, parseISO } from "date-fns";

export const calculateRemainingTime = (endDate: string) => {
  const now = new Date();
  const end = parseISO(endDate);
  if (end <= now) return "Time is up";
  return formatDistanceToNowStrict(end, { addSuffix: false });
};
