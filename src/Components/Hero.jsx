import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

import heroImg from "../media/hero_image.png";
import CustomButton from "./CustomButton";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));
  const Navigate = useNavigate();
  const bookService = () => {
    Navigate('/UsrLogin')
    localStorage.clear();
  };

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "55px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to PrivateCollegeTours 
          </Typography>
            <Title variant="h1">
              A REAL private college tour
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Private College Tours helps parents find honest college tours given by private students and shows a read day-in-the-life at your prospetive college...
            </Typography>
            <Link to="/ServiceProviderList" style={{ textDecoration: 'none' }}>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              onClick={bookService} 
              buttonText="Book a tour"
              heroBtn={true}
            />
            </Link>
          </Box>

          <Box sx={{ flex: "1.51" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "108%", marginBottom: "7rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
