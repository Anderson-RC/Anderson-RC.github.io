var AWS = require('aws-sdk');
//Nb https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/building-sdk-for-browsers.html - we can strip down this giant aws sdk bundle with this if it matters (probably won't for our current use-case)
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-2:8defa56c-7189-4b00-a91d-9248b458c38b',
});
AWS.config.update({region: 'eu-west-2'});
window.console.log(JSON.stringify(AWS.config.credentials));
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

function GenerateTableRow() {
	window.console.log("Table row called");
	if (Cookies.get('timestampidentifier') == null) {Cookies.set('timestampidentifier', (Math.floor(Date.now() / 1000))) }; //Probably an easy way to anonymously tag people in cookies in case of multiple requests
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var params = {
		TableName : 'MobileUserFingerprinting',
		Item: {
		'ClientID': Cookies.get('timestampidentifier'),
		'IS_MOBILE': WURFL.is_mobile,
		'FORM_FACTOR': WURFL.form_factor,
		'DEVICE_NAME': WURFL.complete_device_name,
		'RESOLUTION' :  {"width": windowWidth,
						"height": windowHeight
						},
		'USERAGENT' : window.navigator.userAgent
			}
		}
	docClient.put(params, function(err, data) {
    		if (err) {
        		window.console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    		} else {
        		window.console.log("Added item:", JSON.stringify(data, null, 2));
    		}
	});
}

window.GenerateTableRow = function(){GenerateTableRow();};

