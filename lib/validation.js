/* 
* Node js validation - check these links for details
* https://express-validator.github.io/docs/check-api.html
* https://github.com/validatorjs/validator.js#validators
*/

const { body } = require("express-validator");

exports.validationRules =
	[[
		body("email", "Invalid email address or password")
			.notEmpty()
			.trim()
			.escape()
			.normalizeEmail()
			.isEmail(),
	
		body("password", "The Password must be of minimum 5 characters length")
			.notEmpty()
			.trim()
			.isLength({ min: 5 }),
	],
	[
		// first Name sanitization and validation
		body('fname')
			.notEmpty()
			.trim()
			.escape()
			.withMessage('First Name required')
			.matches(/^[a-zA-Z ]*$/)
			.withMessage('Name: Only Characters with white space are allowed'),	

		// first Name sanitization and validation
		body('lname')
			.trim()
			.escape()
			.notEmpty().withMessage('Last Name required')
			.isAlpha().withMessage('Only Characters with white space are allowed'),

		//email address validation
		body("email")
			.notEmpty()
			.escape()
			.trim().withMessage('Email Address required')
			.normalizeEmail()
			.isEmail().withMessage('Invalid email address, Provide a valid email address!'),
	
		//email address validation
		body("gender", "Gender is required")
			.notEmpty(),
	
		// password validation
		body("password")
			.trim()
			.notEmpty().withMessage("password is required")
			.isLength({min: 5, max: 20})
			.withMessage("password must be minimum 5 character length")
			.isStrongPassword({ minLength: 5, 
								minLowercase: 1, 
								minUppercase: 1, 
								minNumbers: 1, 
								minSymbols: 0, 
								returnScore: false})
			.withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),				

		// confirm password validation
		 body('cpassword').custom((value, { req }) => {
			   if (value !== req.body.password) {
					 throw new Error('Password does not match password');
				}
				return true;
		   })
	]]
	
	

