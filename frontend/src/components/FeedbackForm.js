import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 15px;
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #ffd700; /* Deep Yellow */
  border: none;
  color: #000;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
`;

function FeedbackForm() {
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback', { comments, rating });
      alert('Feedback submitted');
      setComments('');
      setRating('');
    } catch (err) {
      console.error('Feedback submission failed', err);
      alert('Feedback submission failed');
    }
  };

  return (
    <FormContainer>
      <h2>Submit Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
}

export default FeedbackForm;
