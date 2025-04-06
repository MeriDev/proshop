import { useEffect } from 'react';
import {
  usePayPalScriptReducer,
  PayPalButtons,
  DISPATCH_ACTION,
  SCRIPT_LOADING_STATE,
} from '@paypal/react-paypal-js';

// import { useAppSelector } from '../app/hooks';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Message from '../components/Message';
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/orderSlice';
import Loader from '../components/Loader';

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
  const { id: orderId } = useParams<{ id: string }>();
  // const { userInfo } = useAppSelector(state => state.auth);

  const {
    data: orderDetails,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery('');

  const [{ isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        dispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        });

        dispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      if (orderDetails && !orderDetails.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPaypal, loadingPaypal, orderDetails, paypal, dispatch]);

  function createOrder(data, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: orderDetails.totalPrice },
          },
        ],
      })
      .then((orderId: string) => {
        return orderId;
      });
  }

  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment Successful');
      } catch (err) {
        const error = err as CustomError;

        toast.error(error?.data?.message || error.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

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

              {orderDetails.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered Yet </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderDetails.paymentMethod}
              </p>
              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetails.paidAt}
                </Message>
              ) : (
                <Message variant="danger">Not Paid Yet </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetails.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map(
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

              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
