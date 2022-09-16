import { Box, Text, Image, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Product = ({ product }) => {
  const { id, name, color, gender, original_price, final_price, images } =
    product;

  const [img, setImg] = useState(images[0]);

  const navigate = useNavigate();

  const show1Image = () => {
    setImg(images[1]);
  };
  const leave1Image = () => {
    setImg(images[0]);
  };

  return (
    <Box
      onMouseMove={show1Image}
      onMouseLeave={leave1Image}
      onClick={() => navigate(`/shop/${id}`)}
    >
      <Image src={img} alt={name + "Shoe"} />
      <Text>{name + " | " + color + " | " + gender}</Text>
      <Box>
        <HStack justify="center">
          <Text>{"Rs. " + final_price}</Text>
          <Text bg="gray" as="s">
            {original_price}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

//product data
