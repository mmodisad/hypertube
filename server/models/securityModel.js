export async function validString(field, str) {
	return (str.length < 3 ? 
		{'error':`${field} too short`} : !str.match(/^[a-zA-Z0-9_]+$/) ? 
		{'error':`${field} may only contain alphabest, numbers & an underscore`} :
		{'success':`${field} good`})
}
export async function securePassword(pass) {
	var msg = 'password must contain atleast one '
	return (pass.length < 8 ?
		{'error':'password too short (must contain atleast 8 characters)'} :
		pass.search(/[0-9]/) < 0 ? {'error':`${msg} digit`}: 
		pass.search(/[A-Z]/) < 0 ? {'error':`${msg} uppercase character`} :
		pass.search(/[a-z]/) < 0 ? {'error':`${msg} lowercase character`} :
		pass.search(/[!@#$%^&*]/) < 0 ? {'error':`${msg} special character`}:
		{'success':'password is secure'})
}
export async function validEmail(addr) {
	var e = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	return (!addr.match(e) ? {'error':'invalid email'} : {'success':'valid email'})
}