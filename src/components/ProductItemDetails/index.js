import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

// Write your code here

const StatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProductItemDetails extends Component {
  state = {detailProducts: [], similarProductsList: [], count: 1}

  componentDidMount() {
    this.getDetailOfProducts()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure-img-size"
      />
      <h1 className="product-not-found-para">Product Not Found</h1>
      <button type="button" className="continue-shopping-btn">
        Continue Shopping
      </button>
    </div>
  )

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

    if (response.ok) {
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
    } else {
      this.setState({})
    }
  }

  onDecrement = () => {
    const {count} = this.state
    if (count === 1) {
      return this.setState({count: 1})
    }
    return this.setState(prevState => ({count: prevState.count - 1}))
  }

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
          <img src={imageUrl} alt="product" className="image-size" />
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
            <button
              type="button"
              data-testid="minus"
              onClick={this.onDecrement}
            >
              <BsDashSquare className="minus-para" />
            </button>

            <p className="count-para">{count}</p>
            <button onClick={this.onIncrement} type="button" data-testid="plus">
              <BsPlusSquare className="plus-para" />
            </button>
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
        <Header />
        {this.renderProductDetailSection()}
        {this.renderUnorderedList()}
      </div>
    )
  }
}
export default ProductItemDetails
