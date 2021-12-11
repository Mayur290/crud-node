import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";

const registerController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    console.log(req.body);
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check if user exists
    try {
      const exist = await User.exist({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This Email Already Registered")
        );
      }
    } catch (err) {
      return next(err);
    }

    // Hashing password

    res.json({ msg: "Hello from express" });
  },
};

export default registerController;
