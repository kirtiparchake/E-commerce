import React from 'react'

const ItemCard = ({product ,addToCart }) => {
  return (
    <div>
      <img src={product.image} alt="" />
      <div className="name">{product.name}</div>
      <div className="name">{product.price}</div>
      <button onClick={addToCart}>Add to Cart</button>
      <button >order now</button>
    </div>
  )
}

export default ItemCard
