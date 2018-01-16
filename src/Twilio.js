
export const Twilio = {

post (path) {
	return fetch(path).then(response=> response.json()).then(jsonResponse=> jsonResponse.Message)
	},

update (path) {
	return fetch(path).then(response=> response.json()).then(jsonResponse=> jsonResponse.Message)
	}
}

	export default Twilio;
