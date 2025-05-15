import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch()); // reduxga borib slicedagi metodlarni malumotni bog'lashni aytadi
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

     product.getProducts({
      page: 1,
      limit: 5,
      order: "createdAt",
     // productCollection: ProductCollection.DISH,
     })
      .then((data) => setNewDishes(data))
    .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
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
