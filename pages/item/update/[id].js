import { useState } from "react"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const UpdateItem = (props) => {
  const [updateItem, setupdateItem] = useState({
    title: props.singleItem.title,
    price: props.singleItem.price,
    image: props.singleItem.image,
    description: props.singleItem.description,
  })

  const handleChange = (e) => {
    setupdateItem({
      ...updateItem,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://next-fullapp.vercel.app/api/item/update/${props.singleItem._id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateItem)
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch (err) {
      alert("アイテム編集失敗")
    }
  }

  const loginUser = useAuth()

  if (loginUser === props.singleItem.email) {
    return (
      <div>
        <Head><title>アイテム編集</title></Head>
        <h1 className="page-title">アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input value={updateItem.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required />
          <input value={updateItem.price} onChange={handleChange} type="text" name="price" placeholder="価格" required />
          <input value={updateItem.image} onChange={handleChange} type="text" name="image" placeholder="画像" required />
          <textarea value={updateItem.description} onChange={handleChange} type="text" name="description" rows="15" placeholder="商品説明" required></textarea>
          <button>編集</button>
        </form>
      </div>
    )
  } else {
    return (
      <h1>権限がありません</h1>
    )
  }
}

export const getServerSideProps = async (context) => {
  const response = await fetch(`https://next-fullapp.vercel.app/api/item/${context.query.id}`)
  const singleItem = await response.json()

  return {
    props: singleItem
  }
}

export default UpdateItem
