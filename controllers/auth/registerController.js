import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";
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

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check if user exists
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This Email Already Registered")
        );
      }
    } catch (err) {
      return next(err);
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { name, email, password } = req.body;

    //prepare model
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    let access_token;
    try {
      const result = await user.save();

      // creating access token
      access_token = JwtService.sign({ _id: result._id, role: result.role });
    } catch (err) {
      return next(err);
    }

    res.json({ access_token: access_token });
  },
};

export default registerController;
