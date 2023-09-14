import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function WithSubnavigation() {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.900");
  const headingColor = useColorModeValue("gray.800", "white");

  const textAlign = useBreakpointValue({ base: "center", md: "left" }) as "center" | "left";

  const handleLogoutClick = () => {
    // Remove o token do localStorage
    window.localStorage.removeItem("token");
    // Aqui você também pode redirecionar o usuário para a página de login, se necessário
    // Por exemplo: router.push("/login");
  };

  return (
    <Box>
      <Flex
        bg={bg}
        color={textColor}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 20, lg: 32 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={borderColor}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "flex-end", md: "flex-end" }}>
          <Text textAlign={textAlign} fontFamily={"heading"} color={headingColor}>
            <Button as="a" href="/" variant={"link"} onClick={handleLogoutClick}>
              Logout
            </Button>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
