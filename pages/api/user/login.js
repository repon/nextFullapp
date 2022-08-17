import connectDB from '../../../utils/database';
import { UserModel } from '../../../utils/schemaModels';

const loginUser = async (req, res) => {
  try {
    await connectDB()
    const saveUserData = await UserModel.findOne({ email: req.body.email })
    if (saveUserData) {
      if (req.body.password === saveUserData.password) {
        return res.status(200).send({ message: "ログイン成功" })
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
