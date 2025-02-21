import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import NavigationHelp from '../components/NavigationHelp';
import api from '../services/api';
import FeedbackForm from '../components/FeedbackForm';

// Gradient Background Animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main Container
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(-45deg,rgb(255, 0, 204),rgb(255, 230, 0),rgba(60, 0, 255, 0.69),rgb(9, 255, 0));
  background-size: 400% 400%;
  animation: ${gradientAnimation} 10s ease infinite;
`;

// Glassmorphic Content Box
const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

// Heading
const Heading = styled.h1`
  color: #222;
  font-size: 24px;
  font-weight: bold;
`;

// Paragraph
const Paragraph = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.6;
`;

// Admin Mode Toggle
const AdminButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #e60000;
  }
`;

// Input Fields
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

// Admin Panel
const AdminPanel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// New Feedback Section
const FeedbackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 90%;
  max-width: 900px;
  margin-top: 20px;
`;

// Feedback Card
const FeedbackCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Button
const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-weight: bold;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

function Dashboard() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [viewAllFeedbacks, setViewAllFeedbacks] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchFeedback();
      fetchFeedbackCount();
    }
  }, [isAdminLoggedIn]);

  const handleAdminModeToggle = () => {
    setIsAdminMode(!isAdminMode);
    setUsername('');
    setPassword('');
    setIsAdminLoggedIn(false);
    setFeedback([]);
    setFeedbackCount(0);
    setViewAllFeedbacks(false);
    setError(null);
  };

  const handleAdminLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      alert('Welcome, Admin!');
      setIsAdminLoggedIn(true);
    } else {
      alert('Invalid credentials!');
      setIsAdminLoggedIn(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await api.get('/feedback');
      setFeedback(response.data.feedback || []);
    } catch (error) {
      setFeedback([]);
      setError('Error fetching feedback.');
    }
  };

  const fetchFeedbackCount = async () => {
    try {
      const response = await api.get('/feedback/count');
      setFeedbackCount(response.data.feedbackCount || 0);
    } catch (error) {
      setFeedbackCount(0);
      setError('Error fetching feedback count.');
    }
  };

  const feedbackTypes = [
    { comments: 'Great experience! Will use again.', rating: 5 },
    { comments: 'Average service, could be better.', rating: 3 },
    { comments: 'Very convenient and affordable.', rating: 4 },
    { comments: 'Needs improvement in punctuality.', rating: 2 },
    { comments: 'Great experience in its first time only', rating: 4 },
    { comments: 'Excellent customer support.', rating: 5 }
  ];

  const handleViewAllFeedbacks = () => {
    const selectedFeedbacks = [];
    const indices = [];
    while (indices.length < 5) {
      const randomIndex = Math.floor(Math.random() * feedbackTypes.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
        selectedFeedbacks.push(feedbackTypes[randomIndex]);
      }
    }
    setFeedback(selectedFeedbacks);
    setViewAllFeedbacks(true);
    setError(null);
  };

  return (
    <DashboardContainer>
      <Navbar />
      <NavigationHelp />

      <ContentBox>
        <Heading>Dashboard</Heading>
        <Paragraph>Welcome to the Carpooling Ride Sharing Dashboard.</Paragraph>
        <AdminButton onClick={handleAdminModeToggle}>
          {isAdminMode ? 'Turn Off Admin Mode' : 'Turn On Admin Mode'}
        </AdminButton>

        {isAdminMode && !isAdminLoggedIn && (
          <AdminPanel>
            <h3>Admin Login</h3>
            <Input type="text" placeholder="Admin Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleAdminLogin}>Login</Button>
          </AdminPanel>
        )}
      </ContentBox>

      {!isAdminLoggedIn && <FeedbackForm />}
      {isAdminLoggedIn && (
        <FeedbackContainer>
          {feedback.map((fb, index) => (
            <FeedbackCard key={index}>{fb.comments} - ⭐ {fb.rating}</FeedbackCard>
          ))}
        </FeedbackContainer>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
