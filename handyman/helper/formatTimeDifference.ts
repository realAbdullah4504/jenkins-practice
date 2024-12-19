import moment from "moment";

export const formatTimeDifference = (createdAt: string): string => {
  const now = moment();
  const created = moment(createdAt);
  const minutesDifference = now.diff(created, "minutes");

  if (minutesDifference < 60) {
    return `${minutesDifference} hace minutos`;
  } else if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} hace horas`;
  } else {
    const daysDifference = Math.floor(minutesDifference / 1440);
    return `${daysDifference} hace días`;
  }
};
