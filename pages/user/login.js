import { useState } from "react";
import Head from "next/head";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "", password: "",
  })

  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://next-fullapp.vercel.app/api/user/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginUser)
      })
      const jsonData = await response.json()
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)
    } catch (err) {
      alert("ログイン失敗")
    }
  }

  return (
    <div>
      <Head><title>ログイン</title></Head>
      <h1 className="page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={loginUser.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required />
        <input value={loginUser.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required />
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default Login
