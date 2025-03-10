import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { productType } from '../types/types';

const HomeScreen = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">Something went wrong</Message>
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
