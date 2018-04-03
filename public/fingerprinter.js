var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-2:8defa56c-7189-4b00-a91d-9248b458c38b',
});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

function GenerateTableRow() {
	if (Cookies.get('timestampidentifier') == null) {Cookies.set('timestampidentifier', (Math.floor(Date.now() / 1000)) }; //Probably an easy way to anonymously tag people in cookies in case of multiple requests
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var params = {
		TableName : 'MobileUserFingerprinting',
		Item: {
		'HASHKEY': Cookies.get('timestampidentifier'),
		'IS_MOBILE': WURFL.is_mobile,
		'FORM_FACTOR': WURFL.form_factor,
		'DEVICE_NAME': WURFL.complete_device_name,
		'RESOLUTION' : [windowWidth,windowHeight]
	}
};
}

)}
