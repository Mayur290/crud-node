import Joi from "joi";
import { User, RefreshToken } from "../../models";
import bcrypt from "bcrypt";
import CustomeErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";

const loginController = {
  async login(req, res, next) {
    // Validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Database -> Checking USer Existance
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomeErrorHandler.wrongCredentials());
      }

      //Comparing password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomeErrorHandler.wrongCredentials());
      }

      //Generating Access Token
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign(
        { id: user._id, role: user.role },
        "1y",
        REFRESH_SECRET
      );

      // Creating refresh_token in db
      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },
  async logout(req, res, next) {
    //Validation
    const refreshTokenSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshTokenSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      await RefreshToken.deleteOne({ token: req.body.refresh_token });
    } catch (err) {
      return next(new Error("Something went wrong in DB"));
    }

    res.json({ status: 1 });
  },
};

export default loginController;
