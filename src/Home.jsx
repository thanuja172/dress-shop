import React, { useEffect, useState } from "react";
import "./App.css";
import{ useNavigate } from "react-router-dom";

import banner from "./Dresses_Desktop_May25.jpg";

import tops from "./9a27cc3f92c9793640f3018d942406dc.jpg";
import frock from "./563d7ac223b8660bae6e13366f607b1b.jpg";
import lehenga from "./19e642380a6d6108937801bbd8bc4e09.jpg";
import western from "./2cfd9ec61f86daea2d5c1c33079b85f3.jpg";
import tissuesaree from "./29cf5a518b3b991f1b6806f478c61eb6.jpg";
import jeans from "./86564835c1ba2b6ced94231f186c32c8.jpg";
import partywear from "./96c027b90d0460720eca71c423bd1479.jpg";
import kurti from "./c69b44c5ebc4ab7f74a5710a994c83f6.jpg";
import anarkali from "./fbbe288131df76001e2973ef7ac3d6bc.jpg";
import silksaree from "./0ec713a6df1fa013af19bdbe4582e625.jpg";
import palazzoset from "./fad6f687218216b7a583048ce3260796.jpg";
import halfsaree from "./f5703867b6d7004e01bec5a891d434b8.jpg";
import straightsuit from "./7ae6aee637568021ad2535c8155fb75f.jpg";
import ethnicwear from "./a309860c370c33647caffaca413aecab.jpg";
import pinaforemididress from "./19b80ba39b96f535daca9f513e7a3ea7.jpg";
import peplumcoordset from "./43dfecaa35196ee79a1b07f1ae5d2aae.jpg";
import embroideredgown from "./41043da9f55fe7046431763ab0bf7643.jpg";
import indowestern from "./715d47346784bbf2d658fd8915f82748.jpg";
import shararaset from "./89d08bf33df7531335ebd9ac69a146cc.jpg";
import officewear from "./6b99c85bb6c7146a7f86c3cf1077ac74.jpg";

function Home() {
  const navigate = useNavigate();

  // =========================
  // BACKEND PRODUCTS
  // =========================

  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET PRODUCTS FROM MONGODB
  // =========================

  const fetchProducts = async() => {
  setLoading(true);
  fetch("/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Backend Products:", data);
      if (Array.isArray(data)) {
        setBackendProducts(data);
      } else {
        setBackendProducts([]);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error("Product fetch error:", error);
      setBackendProducts([]);
      setLoading(false);
    });
};
const response =
  await fetch(
    `/api/products/${id}`,
    {
      method: "DELETE",
    }
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // STATIC PRODUCTS
  // =========================

  const products = [

    {
      id: "static-1",
      name: "Frock",
      price: 999,
      image: frock,
    },

    {
      id: "static-2",
      name: "Lehenga",
      price: 1999,
      image: lehenga,
    },

    {
      id: "static-3",
      name: "Western Wear",
      price: 1499,
      image: western,
    },

    {
      id: "static-4",
      name: "Kurti",
      price: 899,
      image: kurti,
    },

    {
      id: "static-5",
      name: "Jeans",
      price: 799,
      image: jeans,
    },

    {
      id: "static-6",
      name: "Tops",
      price: 599,
      image: tops,
    },

    {
      id: "static-7",
      name: "Tissue Saree",
      price: 1299,
      image: tissuesaree,
    },

    {
      id: "static-8",
      name: "Party Wear",
      price: 1599,
      image: partywear,
    },

    {
      id: "static-9",
      name: "Anarkali",
      price: 1299,
      image: anarkali,
    },

    {
      id: "static-10",
      name: "Silk Saree",
      price: 3999,
      image: silksaree,
    },

    {
      id: "static-11",
      name: "Palazzo Set",
      price: 799,
      image: palazzoset,
    },

    {
      id: "static-12",
      name: "Half Saree",
      price: 1399,
      image: halfsaree,
    },

    {
      id: "static-13",
      name: "Straight Suit",
      price: 699,
      image: straightsuit,
    },

    {
      id: "static-14",
      name: "Ethnic Wear",
      price: 899,
      image: ethnicwear,
    },

    {
      id: "static-15",
      name: "Pinafore Midi Dress",
      price: 999,
      image: pinaforemididress,
    },

    {
      id: "static-16",
      name: "Peplum Co-ord Set",
      price: 1299,
      image: peplumcoordset,
    },

    {
      id: "static-17",
      name: "Embroidered Gown",
      price: 1799,
      image: embroideredgown,
    },

    {
      id: "static-18",
      name: "Indo-Western",
      price: 2599,
      image: indowestern,
    },

    {
      id: "static-19",
      name: "Sharara Set",
      price: 1399,
      image: shararaset,
    },

    {
      id: "static-20",
      name: "Office Wear",
      price: 1799,
      image: officewear,
    },

  ];

  // =========================
  // FORMAT BACKEND PRODUCTS
  // =========================

  const formattedBackendProducts =
    backendProducts.map((product) => {

      const price = Number(product.price || 0);

      const discount =
        Number(product.discount || 0);

      const finalPrice =
        product.finalPrice !== undefined
          ? Number(product.finalPrice)
          : price - (price * discount) / 100;

      return {

        id: product._id,

        mongoId: product._id,

        name: product.name,

        price: finalPrice,

        originalPrice: price,

        discount: discount,

        image: product.image || frock,

        isBackend: true,

      };

    });

  // =========================
  // COMBINE PRODUCTS
  // =========================

  const allProducts = [
    ...formattedBackendProducts,
    ...products,
  ];

  // =========================
  // WISHLIST
  // =========================

  const [liked, setLiked] = useState([]);

  useEffect(() => {

    const savedWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    setLiked(
      savedWishlist.map(
        (item) => item.name
      )
    );

  }, []);

  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(
    JSON.parse(
      localStorage.getItem("cart") || "[]"
    )
  );

  // =========================
  // WISHLIST
  // =========================

  const handleLike = (product) => {

    let wishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const alreadyLiked =
      wishlist.some(
        (item) =>
          item.name === product.name
      );

    if (alreadyLiked) {

      wishlist =
        wishlist.filter(
          (item) =>
            item.name !== product.name
        );

    } else {

      wishlist.push(product);

    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    setLiked(
      wishlist.map(
        (item) => item.name
      )
    );

  };

  // =========================
  // ADD TO CART
  // =========================

  const handleCart = (product) => {

    let updatedCart = [...cart];

    const existingIndex =
      updatedCart.findIndex(
        (item) =>
          item.id === product.id
      );

    if (existingIndex !== -1) {

      updatedCart[existingIndex] = {

        ...updatedCart[existingIndex],

        quantity:
          Number(
            updatedCart[existingIndex]
              .quantity || 1
          ) + 1,

      };

    } else {

      updatedCart.push({

        ...product,

        quantity: 1,

      });

    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // =========================
  // DELETE MONGODB PRODUCT
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response =
        await fetch(
          `/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (response.ok) {

        alert(
          "Product deleted successfully"
        );

        // Remove immediately from screen
        setBackendProducts(
          (prevProducts) =>
            prevProducts.filter(
              (product) =>
                product._id !== id
            )
        );

      } else {

        alert(
          data.message ||
          "Delete failed"
        );

      }

    } catch (error) {

      console.log(
        "DELETE ERROR:",
        error
      );

      alert(
        "Backend server error"
      );

    }

  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (product) => {

    let updatedCart = [...cart];

    const index =
      updatedCart.findIndex(
        (item) =>
          item.id === product.id
      );

    if (index !== -1) {

      updatedCart[index] = {

        ...updatedCart[index],

        quantity:
          Number(
            updatedCart[index]
              .quantity || 0
          ) + 1,

      };

      setCart(updatedCart);

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

    }

  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (product) => {

    let updatedCart = [...cart];

    const index =
      updatedCart.findIndex(
        (item) =>
          item.id === product.id
      );

    if (index !== -1) {

      const newQuantity =
        Number(
          updatedCart[index]
            .quantity || 1
        ) - 1;

      if (newQuantity <= 0) {

        updatedCart.splice(
          index,
          1
        );

      } else {

        updatedCart[index] = {

          ...updatedCart[index],

          quantity: newQuantity,

        };

      }

      setCart(updatedCart);

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

    }

  };

  // =========================
  // UI
  // =========================

  return (

  <div className="home">

    {/* =========================
        NAVBAR
    ========================= */}

    <div className="navbar">

      <h2 className="logo">
        ELEGANT
      </h2>

      <div className="search">
        <input
          type="text"
          placeholder="Search dresses..."
        />
      </div>

      <div className="nav-links">

        <a href="/wishlist">
          ♡ Wishlist
        </a>

        <a href="/cart">
          🛒 Cart
          {cart.length > 0 && ` (${cart.length})`}
        </a>

        <a href="/profile">
          👤 Profile
        </a>

      </div>

    </div>


    {/* =========================
        BANNER
    ========================= */}

    <img
      src={banner}
      alt="Dress Banner"
      className="banner"
    />

      {/* Title */}

      <h1 className="title">
        Women's Fashion
      </h1>

      {/* Loading */}

      {loading && (

        <p
          style={{
            textAlign: "center",
          }}
        >
          Loading products...
        </p>

      )}

      {/* Backend Product Count */}

      {!loading &&
        backendProducts.length > 0 && (

          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            {backendProducts.length}
            {" "}
            new product(s) available
          </p>

        )}

      {/* Products */}

      <div className="products">

        {allProducts.map(
          (product) => {

            const cartItem =
              cart.find(
                (item) =>
                  item.id ===
                  product.id
              );

            const quantity =
              cartItem
                ? Number(
                    cartItem.quantity
                  )
                : 0;

            return (

              <div
                className="card"
                key={product.id}
              >

                {/* Product Image */}

                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                {/* Backend Badge */}

                {product.isBackend && (

                  <span
                    style={{
                      display:
                        "inline-block",
                      marginTop: "8px",
                      padding:
                        "4px 8px",
                      borderRadius: "5px",
                      fontSize: "12px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    NEW
                  </span>

                )}

                {/* Product Name */}

                <h3>
                  {product.name}
                </h3>

                {/* Price */}

                {product.discount > 0 ? (

                  <div>

                    <span
                      style={{
                        textDecoration:
                          "line-through",
                        marginRight:
                          "8px",
                        color: "gray",
                      }}
                    >
                      ₹
                      {
                        product.originalPrice
                      }
                    </span>

                    <strong>
                      ₹{product.price}
                    </strong>

                    <span
                      style={{
                        marginLeft:
                          "8px",
                        fontSize:
                          "13px",
                      }}
                    >
                      {
                        product.discount
                      }
                      % OFF
                    </span>

                  </div>

                ) : (

                  <p>
                    ₹{product.price}
                  </p>

                )}

                {/* Buttons */}

                <div className="buttons">

                  {/* Cart */}

                  {quantity === 0 ? (

                    <button
                      className="cart-btn"
                      onClick={() =>
                        handleCart(
                          product
                        )
                      }
                    >
                      Add to Cart
                    </button>

                  ) : (

                    <div
                      className="quantity-box"
                    >

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            product
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            product
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  )}

                  {/* Wishlist */}

                  <button
                    className={
                      liked.includes(
                        product.name
                      )
                        ? "like-btn liked"
                        : "like-btn"
                    }
                    onClick={() =>
                      handleLike(
                        product
                      )
                    }
                  >
                    {liked.includes(
                      product.name
                    )
                      ? "♥"
                      : "♡"}
                  </button>

                </div>

                

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}

export default Home;