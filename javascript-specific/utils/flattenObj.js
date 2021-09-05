// Declare an object
let ob = {
	Company: "GeeksforGeeks",
	Address: "Noida",
	contact: +91-999999999,
	mentor: {
		HTML: "GFG",
		CSS: "GFG",
		JavaScript: "GFG"
	}
};

const flattenObj = (ob, nestedProperty = '', result = {}) => {
    for(const key of Object.keys(ob)) {
    	const val = ob[key];
        const property = nestedProperty ? `${nestedProperty}.${key}` : key;
        if(typeof val === 'object') {
        	flattenObj(val, property, result);
        } else {
        	result[property] = val;
        }
    }
    return result;
};

console.log(flattenObj(ob));

// {
//   Company: 'GeeksforGeeks',
//   Address: 'Noida',
//   contact: -999999908,
//   'mentor.HTML': 'GFG',
//   'mentor.CSS': 'GFG',
//   'mentor.JavaScript': 'GFG'
// }