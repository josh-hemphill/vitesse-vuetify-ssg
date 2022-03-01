export const alphabeticSort = function(a: string, b: string, caseSensitive = false, reverse = false) {
	const cS = (s: string) => caseSensitive ? s : s.toLocaleLowerCase();
	return cS(a).localeCompare(cS(b)) * (reverse ? -1 : 1);
};
export const toUpperCase = (str: string) => {
	if (!str) return str;
	return String.prototype.toLocaleUpperCase.call(str);
};
export const toLowerCase = (str: string) => {
	if (!str) return str;
	return String.prototype.toLocaleLowerCase.call(str);
};

export const capToHyphen = (str: string) =>
	str.replace(/[A-Z]/g, (m, offset: number) =>
		`${offset > 0 ? '-' : ''}${m.toLowerCase()}`);
export const hyphenToCap = (str: string, startCap = false) => {
	const up = str.replace(/-[a-z]/g, (m) => m[1].toUpperCase());
	return startCap ? up.replace(/^[a-z]/g, (m) => m.toUpperCase()) : up;
};
