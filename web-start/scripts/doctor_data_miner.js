var GOOGLE_PLACES_API_KEY = "AIzaSyAEOi8tmfUVOuZVquZRte5huCkMba_P3dg"
var DOCTOR_API = "87fd5683a65d33c1d8fe1199c4165635"
var GOOGLE_PLACES_OUTPUT_FORMAT = "json"

var DoctorQuery = require("./DoctorQuery");

var doctorQuery = new DoctorQuery(DOCTOR_API, GOOGLE_PLACES_OUTPUT_FORMAT);

var parameters = {
    user_location: "29.766083,\ -95.358810",
};

// var db_print = {
// 	doctors : [{
// 		id, 
// 		specialty, 
// 		address, 
// 		phone, 
// 		gender, 
// 		hours, 
// 		insurance,
// 	}],
// 	latlngs: [
// 		(latlng): [doctorid]
// 	],
// }

function toLanguage(languages) {
	resp = []
	for (var j in languages) {
		resp.push(languages[j].name); 
	}
	return resp; 
}

function toInsurances(insurance) {
	resp = []
	for (var k in insurance) {
		resp.push(insurance[k].insurance_plan.name);
	}
	return resp
}

var doctors = []
var latlngs = {}
doctorQuery(parameters, function (error, response) {
    if (error) throw error;
	for (i in response.data) {
		doctors.push({
			'id': response.data[i].uid, 
			'first_name': response.data[i].profile.first_name,
			"last_name": response.data[i].profile.last_name,
			'specialty': response.data[i].specialties[0].uid,
			'lat': response.data[i].practices[0].lat,
			'lng': response.data[i].practices[0].lon,
			'phone': response.data[i].practices[0].phones[0].number,
			'gender': response.data[i].profile.gender,
			'languages': toLanguage(response.data[i].profile.languages),
			'insurance': toInsurances(response.data[i].insurances)
		}); 
		latlongString = response.data[i].practices[0].lat + ", " + response.data[i].practices[0].lon;
		latlongString = latlongString.replace(/\./g, '_');
		if (latlngs[latlongString]) {
			latlngs[latlongString].push({'id': response.data[i].uid}); 
		} else {
			latlngs[latlongString] = [{'id': response.data[i].uid}];
		}
	}
	console.log(JSON.stringify({'doctors': doctors, 'latlngs': latlngs}))
});
