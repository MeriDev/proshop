import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productType } from '../types/types';
import Rating from './Rating';

const Product = ({ product }: { product: productType }) => {
  return (
    <Card className="my-3 p2 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">
          <div>${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
