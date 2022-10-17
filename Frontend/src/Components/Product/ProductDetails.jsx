import {
  Box,
  Text,
  Image,
  HStack,
  Flex,
  Button,
  Heading,
  Spacer,
  Square,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addToCart } from "../Redux/Cart/action";
import { getSingleProductData } from "../Redux/Product/action";
import { Product } from "./Product";

export const ProductDetails = () => {
  const loading = useSelector((state) => state.product.loading);
  const singleProduct = useSelector((state) => state.product.singleProduct);
  const error = useSelector((state) => state.product.error);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [size, setSize] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProductData(id));
    }
  }, [dispatch, id]);
  //console.log(singleProduct);

  const handelCart = () => {
    let payload = {
      ...singleProduct,
      size,
    };
    // console.log(payload);
    dispatch(addToCart(payload));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Something went wrong...</h1>;
  }
  if (Object.keys(singleProduct).length === 0) {
    return <h2>Product {id} not found</h2>;
  }
  return (
    <Box m={8}>
      <Flex justify="center" direction={["column", "column", "row"]}>
        <Box flex="50%">
          <Square>
            <Image w="76%" src={singleProduct.images[0]} />
          </Square>
        </Box>
        <Box flex="40%" textAlign="left" pt="4%" pr="8%">
          <Heading fontSize={["20px", "26px", "35px"]}>
            {singleProduct.name +
              " | " +
              singleProduct.color +
              " | " +
              singleProduct.gender}
          </Heading>
          <Text pt={4} fontSize={25}>
            {"Rs. " + singleProduct.final_price}
          </Text>
          <Heading fontSize={20}>Choose a Size</Heading>
          <HStack mt={3}>
            {singleProduct?.sizes.map((size) => {
              return (
                <Button key={size} onClick={() => setSize(size)}>
                  {size}
                </Button>
              );
            })}
          </HStack>
          <Button
            width="70%"
            border="1px"
            bg="#fdd300"
            my={4}
            p={5}
            disabled={!size}
            onClick={handelCart}
            key={size}
          >
            {!size ? "PLEASE SELECT SIZE" : "ADD TO CART"}
          </Button>
          <Text>Use Pay in 3 interest free payments.</Text>
          <Text pt={2}>FREE 7-day returns/exchanges</Text>
          <Text pt={2}>Dispatches within 24 hours</Text>
          <Text pt={2}>View COD Terms & Conditions.Click here</Text>
        </Box>
      </Flex>
    </Box>
  );
};

//product Details data
