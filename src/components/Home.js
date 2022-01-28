import React from 'react';

const Home = (props) => {
  return (
    <div>
        <div className='add-to-cart'>
            <span className='cart-count'>{props.data.length}</span>
            <img src='https://cdn-icons-png.flaticon.com/512/70/70021.png' alt='cart' />
        </div>
        <h2>Home Components</h2>
        <div className='cart-wrapper'>
            <div className='img-wrapper item'>
                <img src='https://www.backmarket.co.uk/cdn-cgi/image/format=auto,quality=75,width=640/https://d1eh9yux7w8iql.cloudfront.net/product_images/36833_4776bbd6-9959-4ea1-85e1-3214d47d481f.jpg' alt='cart' />
            </div>

            <div className='text-wrapper item'>
                <span>I-phone</span>
                <p>Price: 1000.00$</p>
            </div>

            <div className='btn-wrapper item'>
                <button onClick={() => {props.addToCartHandler({price: 1000, name: 'i-phone'})}}>Add to cart </button>
            </div>
        </div>
    </div>
  )
}

export default Home;
