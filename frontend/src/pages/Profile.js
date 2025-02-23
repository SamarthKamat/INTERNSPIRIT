import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import styled, { keyframes } from "styled-components";

// ✨ Glowing Effect for Labels
const glow = keyframes`
  0% { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
  50% { text-shadow: 0 0 20px #1e90ff, 0 0 30px #1e90ff; }
  100% { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
`;

// 🚀 Full-Page Background with Animated Particles
const FullPageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #020024, #090979, #00d4ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  overflow: hidden;
`;

// 📌 Form Fields Layout
const FormContainer = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 18px;
  color: #00ffff;
  font-weight: bold;
  margin-bottom: 5px;
  animation: ${glow} 2s infinite alternate ease-in-out;
`;

// 🎨 Styled Input Fields
const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #00ffff;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
  }
`;

// 📝 Styled Bio Textarea
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #00ffff;
  border-radius: 8px;
  text-align: center;
  resize: none;
  height: 100px;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
  }
`;

// ⚡ Save Button
const StyledButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(135deg, #00ffff, #1e90ff);
  border: none;
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 255, 255, 0.7);
  }
`;

// 🌟 Floating Particles Animation
const float = keyframes`
  0% { transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); opacity: 0.7; }
  25% { transform: translateY(-20px) translateX(10px) scale(1.2) rotate(15deg); opacity: 1; }
  50% { transform: translateY(-40px) translateX(-10px) scale(1) rotate(0deg); opacity: 0.9; }
  75% { transform: translateY(-20px) translateX(5px) scale(1.1) rotate(-15deg); opacity: 1; }
  100% { transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); opacity: 0.7; }
`;

// 🎇 Floating Particle Style
const FloatingParticle = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: radial-gradient(circle, #00ffff, rgba(0, 255, 255, 0.3));
  border-radius: 50%;
  opacity: 0.8;
  animation: ${float} ${(props) => props.duration}s infinite ease-in-out;
  filter: blur(2px);
`;

// 🚀 Full-Screen Particle Container
const ParticleContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
`;

export function Profile() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [bio, setBio] = useState("Passionate about technology and carpooling.");
  const [age, setAge] = useState("25");

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <FullPageContainer>
      <Navbar />

      {/* ✨ Floating Particles */}
      <ParticleContainer>
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 20 + 10; // Random size (10px - 30px)
          const duration = Math.random() * 4 + 2; // Random speed (2s - 6s)
          const left = Math.random() * 100; // Random X position
          const top = Math.random() * 100; // Random Y position

          return (
            <FloatingParticle
              key={i}
              size={size}
              duration={duration}
              style={{ top: `${top}%`, left: `${left}%` }}
            />
          );
        })}
      </ParticleContainer>

      {/* 🔥 Profile Form */}
      <FormContainer>
        <InputContainer>
          <Label>Name</Label>
          <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </InputContainer>

        <InputContainer>
          <Label>Email</Label>
          <StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputContainer>

        <InputContainer>
          <Label>Phone Number</Label>
          <StyledInput type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </InputContainer>

        <InputContainer>
          <Label>Age</Label>
          <StyledInput type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </InputContainer>

        <InputContainer>
          <Label>Bio</Label>
          <StyledTextarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </InputContainer>

        {/* 🔄 Save Button */}
        <StyledButton onClick={handleSave}>Save Changes</StyledButton>
      </FormContainer>
    </FullPageContainer>
  );
}
