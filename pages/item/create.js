import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Head from "next/head"

const CreateItem = () => {
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  })

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://next-fullapp.vercel.app/api/item/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newItem)
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch (err) {
      alert("アイテム作成失敗")
    }
  }

  const loginUser = useAuth()

  if (loginUser) {
    return (
      <div>
        <Head><title>アイテム作成</title></Head>
        <h1>アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <input value={newItem.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required />
          <input value={newItem.price} onChange={handleChange} type="text" name="price" placeholder="価格" required />
          <input value={newItem.image} onChange={handleChange} type="text" name="image" placeholder="画像" required />
          <textarea value={newItem.description} onChange={handleChange} type="text" name="description" rows="15" placeholder="商品説明" required></textarea>
          <button>作成</button>
        </form>
      </div>
    )
  }
}

export default CreateItem
