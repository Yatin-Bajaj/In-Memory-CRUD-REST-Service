const Joi = require("joi");

const REGEX = {
    email_regex: /^([a-zA-Z0-9_]{2,}@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,6})*$/,
    password_regex:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
};

const schema = {
    bodySchema: Joi.object({
        login: Joi.string().email({ minDomainSegments: 2 }).required().messages({
            "string.email": "Invalid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),
        password: Joi.string()
            .min(8)
            .regex(REGEX.password_regex)
            .required()
            .messages({
                "string.pattern.base":
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                "string.min": "Password must be at least {#limit} characters long",
                "any.required": "Password is required",
            }),
        age: Joi.number().min(4).max(130).required().messages({
            "number.min": "Age must be at least 4",
            "number.max": "Age cannot be greater than 130",
        }),
        isDeleted: Joi.boolean()
            .required()
            .messages({ "boolean.required": "Must be boolean" }),
    }),
    idParamSchema: Joi.object({
        id: Joi.string().required(),
    }),
    suggestionQuerySchema: Joi.object({
        loginSubstring: Joi.string().required(),
        limit: Joi.number().required(),
    }),
};

module.exports = schema;

/**
 * TASK 2.2
    Add server-side validation for create/update operations of User entity:
    • all fields are required;
    • login validation is required;
    • password must contain letters and numbers;
    • user’s age must be between 4 and 130.
    In case of any property does not meet the validation requirements or the field is absent, return 400 
    (Bad Request) and detailed error message.
    https://joi.dev/api/?v=17.8.3#objectassert
    https://softchris.github.io/pages/joi.html#introducing-joi
    https://medium.com/geekculture/express-js-api-validation-with-joi-4840505f1e5f
    https://www.topcoder.com/thrive/articles/data-validation-in-nodejs-and-express-using-joi
 */
