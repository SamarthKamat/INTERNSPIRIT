import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import backgroundImage from '../assets/login-background.jpg';

// Styled Components
const PageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.5s ease-out;

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

const StyledTitle = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledForm = styled(Form)`
  .form-control {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 12px;
    height: auto;
    transition: all 0.3s ease;

    &:focus {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.15);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .form-label {
    color: white;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #2196f3, #3f51b5);
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.4);
    background: linear-gradient(45deg, #1e88e5, #3949ab);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)`
  color: #2196f3;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #1e88e5;
    text-decoration: none;
  }
`;

const StyledAlert = styled(Alert)`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
  color: #fff;
`;

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      history.push('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Navbar />
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
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </StyledButton>
                </StyledForm>

                <div className="text-center mt-4">
                  <p style={{ color: 'white' }}>
                    Don't have an account?{' '}
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

export default Login;