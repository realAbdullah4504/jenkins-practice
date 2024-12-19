import { NextApiRequest } from "next";

const getIpAddress = (req: NextApiRequest) => {
	// Extract IP address from request headers
	const ipAddress =
		req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	// If IP address is IPv6, it may return '::ffff:xxx.xxx.xxx.xxx', so extract the IPv4 address
	if (typeof ipAddress === "string" && ipAddress.startsWith("::ffff:")) {
		return ipAddress.split(":").pop();
	}

	return ipAddress;
};

export default getIpAddress;
