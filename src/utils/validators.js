import Joi from "joi";

const createUserValidator = (schema) => (data) =>
  schema.validate(data, { abortEarly: false });

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  registrationNumber: Joi.number().required(),
  manipalEmailID: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().required(),
  mobileNumber: Joi.number().min(1111111111).max(9999999999).required(),
  isHosteller: Joi.boolean().required(),
});

const validateCreateUser = createUserValidator(createUserSchema);

export default validateCreateUser;
