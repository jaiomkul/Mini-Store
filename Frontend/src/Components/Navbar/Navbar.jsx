import { Link } from "react-router-dom";
import React from "react";
import {
  HStack,
  Box,
  Text,
  Image,
  Heading,
  Spacer,
  Icon,
  Show,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Flex,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import MiniStore from "../Image/MiniStore.png";
import { BsSearch, BsBasket3 } from "react-icons/bs";
import { RiUserLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../Redux/Cart/action";

export const Navbar = () => {
  const nav = [
    { title: "Home", to: "/" },
    { title: "Shop", to: "/shop" },
    { title: "WOMEN", to: "/shop" },
    { title: "MEN", to: "/shop" },
    { title: "NEW ARRIVALS", to: "/shop" },
    { title: "ABOUT", to: "" },
    { title: "Help", to: "" },
  ];

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const dispatch = useDispatch();
  const handelDecreaseQty = (id, size, qty) => {
    if (qty > 1) {
      dispatch(decreaseQty({ id, size }));
    } else {
      dispatch(removeFromCart({ id, size }));
    }
  };

  const handelIncreaseQty = (id, size) => {
    dispatch(increaseQty({ id, size }));
  };

  const convertToNumber = (str) => {
    if (Number(str)) {
      return Number(str);
    }
    let arr = str.includes(",") ? str.split(",") : [];
    let final_str = arr.reduce((a, c) => a + c, "");
    let result = Number(final_str);
    return result;
  };

  let total_original_price = 0;
  let total_final_price = 0;

  cart.forEach((prod) => {
    total_original_price += convertToNumber(prod.original_price) * prod.qty;
    total_final_price += convertToNumber(prod.final_price) * prod.qty;
  });

  return (
    <Box h="56px" boxShadow="0 0 1px #0003">
      <HStack pt={3} mx={["10px", "20px", "156px"]}>
        {/* Small view start */}
        <Show below="md">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu />}
              variant="outline"
            />

            <MenuList>
              <MenuItem>
                {nav.map((e, i) => (
                  <Link key={i} to={e.to}>
                    <Heading
                      fontSize={["0.7rem", "0.9rem", "1.1rem"]}
                      px={[2, 3]}
                    >
                      {e.title}
                    </Heading>
                  </Link>
                ))}
              </MenuItem>
            </MenuList>
          </Menu>
          <Spacer></Spacer>
          <Link to="/">
            <Image src={MiniStore} alt="Dan Abramov" />
          </Link>
          <Spacer></Spacer>

          <Text px={3}>
            <Icon as={BsSearch} w="24px" h="24px"></Icon>
          </Text>
          <Text px={3}>
            <Icon as={RiUserLine} w="24px" h="24px"></Icon>
          </Text>

          <HStack ref={btnRef} onClick={onOpen} cursor="pointer">
            <Text px={3}>
              <Icon as={BsBasket3} w="24px" h="24px"></Icon>
            </Text>
            <Text>{cart ? cart.length : 0}</Text>
          </HStack>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            // size="sm"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Your Cart {cart.length}</DrawerHeader>

              <DrawerBody>
                {cart.length > 0 &&
                  cart.map((item) => {
                    return (
                      <Box key={item.id}>
                        <HStack textTransform="capitalize">
                          <Image src={item.images} boxSize="75px"></Image>
                          <Box>
                            <Text fontSize="15px">{`${item.name} | ${item.color} | ${item.gender}`}</Text>
                            <Text as="sub">{item.size}</Text>
                            <HStack>
                              <Text as="s">{`Rs. ${item.original_price}`}</Text>
                              <Text>|</Text>
                              <Text>{`Rs. ${item.final_price}`}</Text>
                            </HStack>
                          </Box>
                        </HStack>
                        <HStack
                          ml={20}
                          border="1px"
                          borderColor="gray.200"
                          borderRadius={5}
                          w="120px"
                          justify="center"
                        >
                          <Button
                            disabled={item.qty === 0}
                            onClick={() =>
                              handelDecreaseQty(item.id, item.size, item.qty)
                            }
                            bg="white"
                          >
                            -
                          </Button>
                          <Text>{item.qty}</Text>
                          <Button
                            onClick={() =>
                              handelIncreaseQty(item.id, item.size)
                            }
                            bg="white"
                          >
                            +
                          </Button>
                        </HStack>
                      </Box>
                    );
                  })}
              </DrawerBody>

              <HStack justify="space-between" px={5} textAlign="center">
                <Text fontWeight="600">SUBTOTAL</Text>
                <HStack px={3}>
                  <Text as="s">Rs. {total_original_price}</Text>
                  <Text>Rs. {total_final_price}</Text>
                </HStack>
              </HStack>
              <DrawerFooter>
                <Button colorScheme="blue">PROCEED TO CHECKOUT</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Show>
        {/* Small view Ens */}

        <Show above="md">
          <Link to="/">
            <Image src={MiniStore} alt="Dan Abramov" />
          </Link>
          <Spacer />
          {nav.map((e, i) => (
            <Link key={i} to={e.to}>
              <Heading fontSize="1.1rem" fontWeight={700} px={3}>
                {e.title}
              </Heading>
            </Link>
          ))}
          <Spacer></Spacer>
          <Text px={3}>
            <Icon as={BsSearch} w="24px" h="24px"></Icon>
          </Text>
          <Text px={3}>
            <Icon as={RiUserLine} w="24px" h="24px"></Icon>
          </Text>

          <HStack ref={btnRef} onClick={onOpen} cursor="pointer">
            <Text px={3}>
              <Icon as={BsBasket3} w="24px" h="24px"></Icon>
            </Text>
            <Text>{cart ? cart.length : 0}</Text>
          </HStack>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="sm"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Your Cart {cart.length}</DrawerHeader>

              <DrawerBody>
                {cart.length > 0 &&
                  cart.map((item) => {
                    return (
                      <Box key={item.id}>
                        <HStack textTransform="capitalize">
                          <Image src={item.images} boxSize="75px"></Image>
                          <Box>
                            <Text fontSize="15px">{`${item.name} | ${item.color} | ${item.gender}`}</Text>
                            <Text as="sub">{item.size}</Text>
                            <HStack>
                              <Text as="s">{`Rs. ${item.original_price}`}</Text>
                              <Text>|</Text>
                              <Text>{`Rs. ${item.final_price}`}</Text>
                            </HStack>
                          </Box>
                        </HStack>
                        <HStack
                          ml={20}
                          border="1px"
                          borderColor="gray.200"
                          borderRadius={5}
                          w="120px"
                          justify="center"
                        >
                          <Button
                            disabled={item.qty === 0}
                            onClick={() =>
                              handelDecreaseQty(item.id, item.size, item.qty)
                            }
                            bg="white"
                          >
                            -
                          </Button>
                          <Text>{item.qty}</Text>
                          <Button
                            onClick={() =>
                              handelIncreaseQty(item.id, item.size)
                            }
                            bg="white"
                          >
                            +
                          </Button>
                        </HStack>
                      </Box>
                    );
                  })}
              </DrawerBody>

              <HStack justify="space-between" px={5} textAlign="center">
                <Text fontWeight="600">SUBTOTAL</Text>
                <HStack px={3}>
                  <Text as="s">Rs. {total_original_price}</Text>
                  <Text>Rs. {total_final_price}</Text>
                </HStack>
              </HStack>
              <DrawerFooter>
                <Button colorScheme="blue">PROCEED TO CHECKOUT</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Show>
        {/* ------Full Navbar ----- */}
      </HStack>
    </Box>
  );
};
