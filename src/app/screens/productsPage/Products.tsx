import React, { ChangeEvent, useEffect, useState } from "react";
import {  Badge, Box, Button, CardContent, Container, Input, Stack } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {RemoveRedEye} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import  ArrowBackIcon  from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
 setProducts: (data: Product[]) => dispatch(setProducts(data)),
  
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products }) 
);


export default function Products() {

    const {setProducts} = actionDispatch(useDispatch()) //setProducts lomandasini actiondispach orqali qabul qilamiz va uning ichiga usedispachni kiritib run qilib olamiz
    const { products } = useSelector(productsRetriever); 
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
             page: 1,
            limit: 8,
            order: "createdAt",
            productCollection: ProductCollection.DISH,
            search: "",
    });

    useEffect(() => {
        const product = new ProductService(); 
        product.getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
      
    }, [productSearch]); 

    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();

    useEffect(() => {
        if (searchText === "") {
            productSearch.search = "";
            setProductSearch({ ...productSearch });
      }
    }, [searchText]);

    /** HANDLERS**/
  
    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({ ...productSearch });
    };
  
    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch });        
    }

    const searchProductHandler = () => {
    setProductSearch(() => ({
      ...productSearch,
      search: searchText,
    }));
  };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
    };

    const chooseDishHandler = (id: string) => {
        history.push(`/products/${id}`)
    }

    return(
        <div className="products">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>       
                    <Stack className="avatar-big-box">
                        <Box className = 'top-text'>Burak Restaurant</Box>
                       <div className="searchbar" >
                            <input type={"search"} placeholder="Type here"  value={searchText} onChange={(e) => 
                                setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") searchProductHandler();
                                }}
                            /> <button onClick={searchProductHandler}>Search</button>
                        </div>

                    </Stack> 
                    <Stack className="dishes-filter-section">
                    <Button 
                            variant={"contained"}
                             className={"order"}
                            color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                            onClick={() => searchOrderHandler("createdAt")}
                        >
                        New
                        </Button>
                        <Button 
                            variant={"contained"}
                            className={"order"}
                               color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                            onClick={() => searchOrderHandler("productPrice")}
                        >
                        Price
                        </Button>
                        <Button 
                            variant={"contained"}
                            className={"order"}
                             color={productSearch.order === "productViews" ? "primary" : "secondary"}
                            onClick={() => searchOrderHandler("productViews")}
                        >
                        Views
                        </Button>

                    </Stack>
                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button  variant={"contained"} color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"}  onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>
                                    Other
                                </Button>
                                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DESERT ? "primary" : "secondary"} onClick={() => searchCollectionHandler(ProductCollection.DESERT)}>
                                    Dessert
                                </Button>
                                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"} onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                                    Drink
                                </Button>
                                 <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"} onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                                    Salad
                                </Button>
                                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"} onClick={() => searchCollectionHandler(ProductCollection.DISH)}>
                                    Dish
                                </Button>
                            </div>
                        </Stack>
                        <div className="popular-dishes-frame">
        <Container>
            <Stack className="popular-section">
                <Stack className="cards-frame">
         {products.length !== 0 ? (
                                            products.map((product: Product) => {
                                                const imagePath = `${serverApi}/${product.productImages[0]}`
                                                const sizeVolume = product.productCollection === ProductCollection.DRINK ? product.productVolume + "litre" : product.productSize + "size";
                    return(
                        <Container key={product._id} className="card" onClick={() => chooseDishHandler(product._id)}>
                            <img className = "product-img" src={imagePath} alt="" />
                            <div className="product-size" style={{position:"absolute"}}>{sizeVolume}</div>
                            <Button className="shop-btn">
                                <img src={"/icons/shopping-cart.svg"}
                                style={{display:"flex"}} 
                                alt="" />
                            </Button>
                            <Button className="view-btn" sx={{ right : "36px", top : "180px"}}>
                                <Badge badgeContent = {product.productViews} color="secondary">
                                    <RemoveRedEye sx={{
                                        color: product.productViews === 0 ? "gray" : "white",
                                    }} />
                                </Badge>
                            </Button>
                            <Box className= "food-name">
                            <Box className="pro-name" >{product.productName}</Box>
                            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                                <img src="/icons/dollar.svg" alt="" />
                                <div style={{color:"#E3C08D"}}>{product.productPrice}</div>
                            </div>
                            </Box>
                        </Container>
              )
           })
         ) : (
          <Box className = "no-data">Products are not available!</Box>
         )}
                </Stack>
            </Stack>
        </Container>
    </div>
                    </Stack>
                    <Stack className="pagination-section">
                        <Pagination 
                        count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
                        page={productSearch.page}
                        renderItem={(item)=>(
                            <PaginationItem components={{
                                previous:ArrowBackIcon,
                                next:ArrowForwardIcon,
                            }}
                            {...item}
                            color="secondary"
                            />
                            )}
                            onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>
                    <Stack className="family-brands">
                        <Container className="brands-wrapper">
                            <Box className = "brands-text">Our Family Brands</Box>
                            <div className="brands-img-wrapper">
                            <img className="brands-img" src="/img/gurme.webp" alt="" />
                            <img className="brands-img" src="/img/seafood.webp" alt="" />
                            <img className="brands-img" src="/img/sweets.webp" alt="" />
                            <img className="brands-img" src="/img/doner.webp" alt="" />
                            </div>
                        </Container>
                    </Stack>
            <div className="address">
                <Container>
                    <Stack className="address-area">
                        <Box className ="title">Our Address</Box>
                        <iframe 
                        style={{marginTop:"60px", width:"100%"}}
                        src="https://maps.google.com/maps?q=Burak%20restaurand%20istanbul&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                        width={"1320"}
                        height={"500"}
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    )
}