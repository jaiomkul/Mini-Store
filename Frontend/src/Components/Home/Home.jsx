import { Box, Text, Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "../Filter/Filter";
import { Product } from "../Product/Product";
import { getData } from "../Redux/Product/action";
import PauseOnHover from "./Silder";

export const Home = () => {
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);
  const error = useSelector((state) => state.product.error);
  // console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products?.length === 0) {
      dispatch(getData());
    }
  }, [dispatch, products.length]);

  return (
    <Box>
      <PauseOnHover></PauseOnHover>
      <Heading>BESTSELLERS</Heading>
      {loading ? (
        <Text>Entities Loading...</Text>
      ) : error ? (
        <Text>Something went wrong, please try again later</Text>
      ) : (
        <Box>
          <Grid
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={6}
            justifyItems="center"
            mx={5}
          >
            {products.length > 0 &&
              products.map((product) => {
                return <Product key={product.id} product={product}></Product>;
              })}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
