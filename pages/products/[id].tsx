import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { motion } from "framer-motion";

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const Product = (props: any) => (
  <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
    <div className="fullscreen">
      <div className="product">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="img"
        >
          <motion.img
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            key={props.product.image}
            src={props.product.image}
            alt={props.product.name}
            width={550}
            height={500}
          />
        </motion.div>
        <div className="product-details">
          <motion.div variants={stagger} className="inner">
            <Link href="/" passHref={true}>
              <div>
                <motion.div variants={fadeInUp} className="go-back">
                  Back to products
                </motion.div>
              </div>
            </Link>
            <div>
              <motion.div variants={fadeInUp} className="category">
                Protein
              </motion.div>
            </div>
            <motion.h1 variants={fadeInUp}>{props.product.name}</motion.h1>
            <motion.p variants={fadeInUp}>{props.product.details}</motion.p>
            <motion.div variants={fadeInUp} className="additonals">
              <span>Soy Free</span>
              <span>Gluten Free</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="qty-price">
              <div className="qty">
                <div className="minus">-</div>
                <div className="amount">1</div>
                <div className="add">+</div>
              </div>
              <span className="price">{props.product.price}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="btn-row">
              <button className="add-to-cart"> Add to cart</button>
              <button className="subscribe"> Subscribe</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

Product.getInitialProps = async function (context: any) {
  const { id } = context.query;
  const res = await fetch(
    `https://my-json-server.typicode.com/PrincekO/fake-products-api/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;
