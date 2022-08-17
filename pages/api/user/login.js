import jwt from 'jsonwebtoken';
import connectDB from '../../../utils/database';
import { UserModel } from '../../../utils/schemaModels';

const secret_key = process.env.SECRET_KEY

const loginUser = async (req, res) => {
  try {
    await connectDB()
    const saveUserData = await UserModel.findOne({ email: req.body.email })
    if (saveUserData) {
      if (req.body.password === saveUserData.password) {
        const payload = {
          email: req.body.email,
        }

        const token = jwt.sign(payload, secret_key, { expiresIn: "23h" })
        console.log(token)

        return res.status(200).send({ message: "ログイン成功", token: token })
      } else {
        return res.status(400).send({ message: "ログイン失敗：パスワードが違います" })
      }
    } else {
      return res.status(400).send({ message: "ログイン失敗：ユーザー登録をしてください" })
    }
  } catch (err) {
    return res.status(400).send({ message: "ログイン失敗" })
  }
}

export default loginUser
