import moment from 'moment'

export const formatDate = (payload: string) => {
  return moment(payload).format("dddd Do MMMM, YYYY")
}

export const formatOnlyDate = (payload: string) => {
  return moment(payload).format("DD-MM-YYYY")
}

export const formatOnlyTime = (payload: string) => {
  return moment(payload).format("hh:mmA")
}

export const formatDateTime = (payload: string) => {
  return moment(payload).format("dddd Do MMMM, YYYY - hh:mm A")
}

export const formatDateDashTime = (payload: string) => {
  return moment(payload).format("DD-MM-YYYY - hh:mm A")
}

export const timeDiffDay = (date: Date | string) => {
  const timePart = moment(date).format('hh:mm A');
  const now = moment();
  const diffDays = now.diff(date, 'days');

  if (diffDays === 0) {
    return `Today - ${timePart}`;
  } else if (diffDays === 1) {
    return `Yesterday - ${timePart}`;
  } else {
    return `${diffDays} Days ago - ${timePart}`;
  }
}

export const timeDiff = (payload: string) => {
  return moment(payload).fromNow()
}

export const timeDiff2 = (payload: string) => {
  const now = moment();
  const time = moment(payload);
  const diffInMs = now.diff(time);

  if (diffInMs < 1000) {
    return `${diffInMs}ms`;
  } else if (diffInMs < 60 * 1000) {
    return `${Math.floor(diffInMs / 1000)}s`;
  } else if (diffInMs < 60 * 60 * 1000) {
    return `${Math.floor(diffInMs / (60 * 1000))}m`;
  } else if (diffInMs < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffInMs / (60 * 60 * 1000))}h`;
  } else {
    return `${Math.floor(diffInMs / (24 * 60 * 60 * 1000))}d`;
  }
};

export const getMinutesDifference = (time: string) => {
  const currentTime = moment();
  const futureTime = moment(time);
  const difference = futureTime.diff(currentTime, 'minutes');
  return difference
}

export const getHoursDifference = (time: string) => {
  const currentTime = moment();
  const futureTime = moment(time);
  const difference = futureTime.diff(currentTime, 'hours');
  return difference
}