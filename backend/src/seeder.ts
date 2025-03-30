import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db';
import User from './models/userModel';
import Product from './models/productModel';
import Order from './models/orderModel';

import products from './data/products';
import users from './data/users';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
