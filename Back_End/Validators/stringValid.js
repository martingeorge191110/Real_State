/**
 * Function to make the first letter of Fn and Ln Upper Case
 * @username: user name
 *
 * Return: (User Name)
 */

const nameUpperCase = (userName) => {
	let uppered = []
	let result = "";

	uppered = userName.split(' ')
	uppered.forEach((ele, i) => {
		ele = ele[0].toUpperCase() + ele.slice(1)
		result += ele
		if (i < uppered.length - 1)
			result += ' '
	});
	return (result)
}

export {nameUpperCase}