import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

// Write your code here
class ProductItemDetails extends Component {
  state = {detailProducts: []}

  componentDidMount() {
    this.getDetailOfProducts()
  }

  getDetailOfProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      id: data.id,
      imageUrl: data.image_url,
      price: data.price,
      rating: data.rating,
      title: data.title,
      totalReviews: data.total_reviews,
    }
    this.setState({detailProducts: updatedData})
    console.log(updatedData)
    console.log(data)
  }

  renderProductDetailSection = () => {
    const {detailProducts} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = detailProducts
    return (
      <div className="detail-product-container">
        <div className="img-container">
          <img src={imageUrl} alt="start" className="image-size" />
        </div>
        <div className="description-container">
          <h1 className="title-heading">{title}</h1>
          <p className="price-para">{`Rs ${price}/-`}</p>
          <div className="star-rating-containers">
            <div className="rating-container">
              <div className="star-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-image-size"
                />
              </div>
            </div>
            <div>
              <p className="review-para">{`${totalReviews} Reviews`}</p>
            </div>
          </div>
          <p className="description-para">{description}</p>
          <p className="available-para">{`Available: ${availability}`}</p>
          <p className="available-para">{`Brand: ${brand}`}</p>
          <hr />
        </div>
      </div>
    )
  }

  render() {
    return <>{this.renderProductDetailSection()}</>
  }
}
export default ProductItemDetails
