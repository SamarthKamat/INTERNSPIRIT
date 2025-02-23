import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import api from "../services/api";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import styled from "styled-components";
import backgroundImage from "../assets/login-background.jpg";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import  { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

// 🚗 Car Animation Keyframes
const moveCar = keyframes`
  0% { transform: translateX(-100vw); }
  50% { transform: translateX(10vw); }
  100% { transform: translateX(100vw); }
`;

// 💫 Page Container
const PageContainer = styled.div`
  background: radial-gradient(circle, #020024 0%, #090979 35%, #00d4ff 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// 🚘 Animated Car
const AnimatedCar = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  left: -100px;
  width: 150px;
  height: 80px;
  z-index: 1;
  animation: ${moveCar} 6s linear infinite;
`;

// 🌟 Content Wrapper
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`;

// 🟢 Glassmorphic Login Box
const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 90%;
  max-width: 500px;
  text-align: center;
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// ✨ Glowing Title
const StyledTitle = styled.h2`
  color: white;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 255, 255, 0.6);
`;

// 🎨 Styled Form
const StyledForm = styled(Form)`
  .form-control {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 12px;
    font-size: 16px;
    transition: all 0.3s ease;
    border-radius: 10px;

    &:focus {
      background: rgba(255, 255, 255, 0.25);
      border-color: #00d4ff;
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .form-label {
    color: white;
    font-weight: bold;
  }
`;

// 🔥 Glowing Button
const StyledButton = styled(Button)`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #00d4ff, #008cff);
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.9);
  }
`;

// 🔗 Styled Link
const StyledLink = styled(Link)`
  color: #00d4ff;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #008cff;
    text-decoration: none;
  }
`;

// ❗ Error Alert
const StyledAlert = styled(Alert)`
  background: rgba(255, 50, 50, 0.1);
  border: 1px solid rgba(255, 50, 50, 0.3);
  color: #fff;
`;

function LogIn() {
  const history = useHistory();
  const { login } = useAuth(); // Get the login function from the context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const userData = response.data.user;
      const token = response.data.token;
      console.log(userData, token);
      login(userData, token); // Pass both user data and token to login
      history.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      {/* 🏎️ Moving Car Animation */}
      <AnimatedCar>
        <Car size={100} color="white" strokeWidth={2} />
      </AnimatedCar>

      {/* 🎯 Login Form */}
      <ContentContainer>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <GlassContainer>
                <StyledTitle>Welcome Back</StyledTitle>
                {error && <StyledAlert variant="danger">{error}</StyledAlert>}

                <StyledForm onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <StyledButton
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </StyledButton>
                </StyledForm>

                <div className="text-center mt-4">
                  <p style={{ color: "white" }}>
                    Don't have an account?{" "}
                    <StyledLink to="/register">Create one now</StyledLink>
                  </p>
                </div>
              </GlassContainer>
            </Col>
          </Row>
        </Container>
      </ContentContainer>
    </PageContainer>
  );
}

export default LogIn;
