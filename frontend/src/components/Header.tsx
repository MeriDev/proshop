import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useLogoutMutation } from '../slices/userSlice';
import { logout } from '../slices/authSlice';
import { resetCart, clearCartItems } from '../slices/cartSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { cartItems } = useAppSelector(state => state.cart);
  const { userInfo } = useAppSelector(state => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());

      dispatch(resetCart());
      dispatch(clearCartItems());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            ProShop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/cart" className="flex">
                <FaShoppingCart style={{ marginRight: '5px' }} /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: '8px' }}>
                    {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser style={{ marginRight: '5px' }} />
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
