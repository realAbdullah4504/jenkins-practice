import moment from "moment";
const getFormatTime = (time: Date) => {
	if (moment(time).date() === moment(new Date()).date()) {
		return moment(time).format("LT");
	} else if (moment(time).year() !== moment(new Date()).year()) {
		return moment(time).format("LLL");
	}
	{
		return (
			moment(time).format("MMM Do") +
			" " +
			"at" +
			" " +
			moment(time).format("LT")
		);
	}
};

export default getFormatTime;
