import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import SimilarProductItem from '../SimilarProductItem'

// Write your code here
class ProductItemDetails extends Component {
  state = {detailProducts: [], similarProductsList: [], count: 1}

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

    const similarProducts = data.similar_products.map(each => ({
      id: each.id,
      availability: each.availability,
      brand: each.brand,
      description: each.description,
      imageUrl: each.image_url,
      price: each.price,
      rating: each.rating,
      title: each.title,
      style: each.style,
      totalReviews: each.total_reviews,
    }))
    this.setState({
      detailProducts: updatedData,
      similarProductsList: similarProducts,
    })
    console.log(data)
  }

  onDecrement = () => this.setState(prevstate => ({count: prevstate.count - 1}))

  onIncrement = () => this.setState(prevstate => ({count: prevstate.count + 1}))

  renderProductDetailSection = () => {
    const {detailProducts, count} = this.state
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
          <div className="plus-minus-container">
            <div className="minus-container">
              <p className="minus-para" onClick={this.onDecrement}>
                -
              </p>
            </div>

            <p className="count-para">{count}</p>
            <div className="plus-container">
              <p className="plus-para" onClick={this.onIncrement}>
                +
              </p>
            </div>
          </div>
          <button className="add-to-cart-btn" type="button">
            Add To Cart
          </button>
        </div>
      </div>
    )
  }

  renderUnorderedList = () => {
    const {similarProductsList} = this.state
    return (
      <ul className="unordered-list">
        {similarProductsList.map(eachItem => (
          <SimilarProductItem eachList={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="products-container">
        {this.renderProductDetailSection()}
        {this.renderUnorderedList()}
      </div>
    )
  }
}
export default ProductItemDetails
