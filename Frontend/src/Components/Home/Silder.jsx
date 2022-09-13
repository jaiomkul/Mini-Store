import { Box, Heading, Image, Stack, Button } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const fadeImages = [
  {
    url: "https://cdn.shopify.com/s/files/1/0258/2485/4100/files/Softknit_banner1.jpg?v=1655047319",
    caption: "India's most innovative sneaker brand",
    tittle: "Making shoes for the new generation.",
    caption1: "",
    button: "LEARN MORE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0258/2485/4100/files/Linen_banner2.jpg?v=1655047319",
    caption: "",
    tittle: "India's First",
    caption1: "Linen Sneakers",
    button: "LEARN MORE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0258/2485/4100/files/KoolTex_banner2.jpg?v=1655047319",
    caption: "",
    tittle: "The First",
    caption1: "Dry Fit Trainers",
    button: "LEARN MORE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0258/2485/4100/files/Banana_banner1.jpg?v=1655047319",
    caption: "",
    tittle: "World's First",
    caption1: "Banana Fibre Sneakers",
    button: "LEARN MORE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0258/2485/4100/files/FH_Banner3jpg_41cafa8d-1e9b-4545-9cd6-fa20b38961b0.jpg?v=1655199681",
    caption: "",
    tittle: "All-weather",
    caption1: "SoftKnit Loafers",
    button: "LEARN MORE",
  },
];

export default function PauseOnHover() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  let banner = fadeImages.map((fadeImage, index) => (
    <Box key={index}>
      <Stack id="main" direction={["column", "row", "row"]} m="auto">
        <Box className="banner_right" w={["100%", "56%", "56%"]}>
          <Image w="100%" src={fadeImage.url} />
        </Box>
        <Box
          className="banner_left"
          alignItems="center"
          w={["100%", "44%", "44%"]}
          bg="#61dafb"
        >
          <Box pt={[10, 15, 20]}>
            <Heading fontSize={["16px", "24px", "32px"]}>
              {fadeImage.caption}
            </Heading>
            <Heading fontSize={["12px", "16px", "20px"]}>
              {fadeImage.tittle}
            </Heading>
            <Heading fontSize={["16px", "24px", "32px"]}>
              {fadeImage.caption1}
            </Heading>
            <Button>{fadeImage.button}</Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  ));

  return <Slider {...settings}>{banner}</Slider>;
}
