import { Box, Text, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "../Filter/Filter";
import { Product } from "./Product";
import { getData } from "../Redux/Product/action";

export const Shop = () => {
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
      <Text>Shop All</Text>
      <Filter></Filter>
      {loading ? (
        <Text>Entities Loading...</Text>
      ) : error ? (
        <Text>Something went wrong, please try again later</Text>
      ) : (
        <Box>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={6}
            mx={2}
            justifyItems="center"
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
