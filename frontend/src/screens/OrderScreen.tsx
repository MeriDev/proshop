// import { useEffect } from 'react';
// import { useAppSelector } from '../app/hooks';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap';

import { useGetOrderDetailsQuery } from '../slices/orderSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

type CustomError = {
  data?: {
    message?: string;
  };
  error?: string;
};

type CartItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
};

const OrderScreen = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: orderDetails,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // const { userInfo } = useAppSelector(state => state.auth);

  // useEffect(() => {}, []);

  const deliverHandler = async () => {
    try {
      console.log('Delivering order...');
    } catch (error) {
      const customError = error as CustomError;
      toast.error(
        customError.data?.message || customError.error || 'Something went wrong'
      );
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {(error as CustomError).data?.message || (error as CustomError).error}
    </Message>
  ) : (
    <>
      <h1>Order {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {orderDetails.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetails.user.email}`}>
                  {orderDetails.user.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {orderDetails.shippingAddress.address},{' '}
                {orderDetails.shippingAddress.city}{' '}
                {orderDetails.shippingAddress.postalCode},{' '}
                {orderDetails.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderDetails.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {orderDetails.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.cartItems.map(
                    (item: CartItem, index: number) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} =$
                            {(item.qty * (item.price * 100)) / 100}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderDetails.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-black"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
