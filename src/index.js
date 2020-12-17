const mask = text => {
	const ips = extractIpFromText(text);
	const key = Math.floor(Math.random() * 254) + 1;
	ips.forEach(ip => {
		const maskedIp = maskIp(ip, key);
		text = text.replace(ip, maskedIp);
	});

	return text;
};

const maskIp = (ip, key) => {
	const octets = ip.split('.');
	const maskedOctets = octets.map(o => {
		return Number(o) ^ key;
	});
	return maskedOctets.join('.');
};

const extractIpFromText = text => {
	const pattern = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;
	return text.match(pattern);
};

module.exports = {
	mask
};
