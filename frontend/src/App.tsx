import { Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <>
      <Header />
      <Container>
        <main className="py-3">
          <Routes>
            <Route path="/" index element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
