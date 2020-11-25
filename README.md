#Typescript
Globe Labs SMS service

==============================================================================

Sending SMS (sms-mt)

	Shortcode
	- Your shortcode suffix (last 4 digits)

	access_token
	- Contains security information for transacting with a subscriber. Subscriber needs to grant an app first via SMS or Web Form Subscriber Consent Workflow.

	address
	- Target number

	clientCorrelator
	- Uniquely identifies this create SMS request. If there is a communication failure during the request, using the same clientCorrelator when retrying the request allows the operator to avoid sending the same SMS twice.

	message
	- Must be provided within the outboundSMSTextMessage element. Currently, the API implementation is limited a maximum of 160 characters. Also make sure that your language or framework’s editor is encoding the HTTP parameters as UTF-8
