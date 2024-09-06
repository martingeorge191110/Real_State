
/**
 * Utility Function for Register page countries list
 */

const countryListHandler = (element, reqiredClass) => {
	if (element.children[0].classList.contains(reqiredClass[0]))
		element.children[0].classList.remove(reqiredClass[0])
	else
		element.children[0].classList.add(reqiredClass[0])


	if (element.parentElement.children[1].classList.contains("display"))
		element.parentElement.children[1].classList.remove("display")
	else
		element.parentElement.children[1].classList.add("display")
}


export {countryListHandler}