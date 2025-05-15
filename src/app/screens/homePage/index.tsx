import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch()); // reduxga borib slicedagi metodlarni malumotni bog'lashni aytadi
 //usedispach store bilan bog'lab beradi
  // Selector: Store => Data
  console.log(process.env.REACT_APP_API_URL);
  useEffect(() => {
    // Backend sever data request => Data
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 5,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    }).then(data => {
      console.log("data:", data);
      setPopularDishes(data);
    }).catch(err => console.log(err));

  }, []);
   



  return (
    <div className={"homepage"} >
<Statistics/>
<PopularDishes/>
<NewDishes/>
<Advertisement/>
<ActiveUsers/>
<Events/>
  </div >);
};
