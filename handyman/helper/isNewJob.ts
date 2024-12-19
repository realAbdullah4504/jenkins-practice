import moment from "moment";

export const isNewJob = (created_at: Date) => {
  const now = moment();
  const created = moment(created_at);

  const hoursDifference = now.diff(created, "days");

  if (hoursDifference >= 1) {
    return false;
  } else {
    return true;
  }
};
