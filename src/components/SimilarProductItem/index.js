import './index.css'

// Write your code here
const SimilarProductItem = props => {
  const {eachList} = props
  const {imageUrl, title, price, rating, brand} = eachList
  return (
    <li className="list">
      <div className="similar-product-container">
        <img
          src={imageUrl}
          alt={`similar product ${title}`}
          className="img-size"
        />
        <p className="title-para">{title}</p>
        <p className="brand-para">{`by ${brand}`}</p>
        <div className="rating-price-container">
          <p className="price-para">{`Rs ${price}/-`}</p>
          <div className="similar-star-container">
            <p className="rating-para">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="similar-star-image-size"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
