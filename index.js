const mask = text => {
	const ips = extractIpFromText(text);
	let key = Math.floor(Math.random() * 254) + 1;
	let ipNetworks = {};
	let maskedIps = {};
	ips.forEach(ip => {
		let maskedIp = '';
		if (maskedIps.hasOwnProperty(ip)) {
			maskedIp = maskedIps[ip];
		} else {
			const network = extractNetwork(ip);
			if (ipNetworks.hasOwnProperty(network)) {
				const maskedHost = maskHost(ip, key);
				const existNetwork = ipNetworks[network].join('.');
				maskedIp = `${existNetwork}.${maskedHost}`;
				maskedIps[ip] = maskedIp;
			} else {
				key = Math.floor(Math.random() * 254) + 1;
				maskedIp = maskIp(ip, key);
				ipNetworks[network] = extractNetwork(maskedIp);
				maskedIps[ip] = maskedIp;
			}
		}

		text = text.replace(ip, maskedIp);
	});

	return text;
};

const extractNetwork = ip => {
	const octets = ip.split('.');
	octets.pop();
	return octets;
};

const maskHost = (ip, key) => {
	const octets = ip.split('.');
	const host = octets.pop();
	return Number(host) ^ key;
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
