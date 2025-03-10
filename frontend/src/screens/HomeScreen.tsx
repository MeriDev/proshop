import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { productType } from '../types/types';

const HomeScreen = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(() => {
            if ('status' in error) {
              return 'error' in error
                ? error.error
                : JSON.stringify(error.data);
            } else if ('message' in error) {
              return error.message;
            }
            return 'An unexpected error occurred';
          })()}
        </Message>
      ) : products ? (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product: productType) => (
              <Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      ) : null}
    </>
  );
};

export default HomeScreen;
