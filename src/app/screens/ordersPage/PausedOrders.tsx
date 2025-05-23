import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";

/**REDUX SLICE & SELECTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);


export default function PausedOrders() {
    const { pausedOrders } = useSelector(pausedOrdersRetriever);
    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order.orderItems?.map((item: OrderItem) => {
                                    const product: Product = order.productData.filter((ele: Product) => item.productId === ele._id)[0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <img src={imagePath} className={"orders-dish-img"} alt="" />
                                            <p className={"title-dish"}>{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} alt="" />
                                                <p>{item.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} alt="" />
                                                <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} alt="" />
                                    <p>Delivery cost</p>
                                    <p>${ order.orderDelivery}</p>
                                    <img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} alt="" />
                                    <p>Total</p>
                                    <p>${ order.orderTotal}</p>
                                </Box>
                                <Button variant="contained" color="secondary" className={"cancel-button"}>
                                    Cancel
                                </Button>
                                <Button variant="contained" className={"pay-button"}>
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!pausedOrders ||  (pausedOrders.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} alt="" />
                    </Box>
                ))}
            </Stack>
        </TabPanel>
    )
}