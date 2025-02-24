import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import styled, { keyframes } from "styled-components";

// ✨ Glowing Text Animation
const glow = keyframes`
  0% { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
  50% { text-shadow: 0 0 25px #1e90ff, 0 0 35px #1e90ff; }
  100% { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
`;

// 🎆 Full-Screen Background with Animated Particles
const FullPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #020024, #090979, #00d4ff);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
`;

// 📌 Full-Screen Form Layout
const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  padding: 60px;
  border-radius: 0;
  box-shadow: 0 0 80px rgba(0, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

// 🎭 Input Layout
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 500px;
`;

// 🔷 Labels with Glowing Effect
const Label = styled.label`
  font-size: 20px;
  color: #00ffff;
  font-weight: bold;
  margin-bottom: 8px;
  animation: ${glow} 2s infinite alternate ease-in-out;
  text-align: center;
`;

// 🎨 Styled Input Fields
const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #00ffff;
  border-radius: 10px;
  text-align: center;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  }
`;

// 🚗 Car Selection Dropdown
const StyledSelect = styled.select`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #00ffff;
  border-radius: 10px;
  text-align: center;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  }
`;

// ⚡ Save Button with Hover Effect
const StyledButton = styled.button`
  margin-top: 20px;
  width: 60%;
  max-width: 500px;
  padding: 18px;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(135deg, #00ffff, #1e90ff);
  border: none;
  color: #000;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 255, 255, 0.8);
  }
`;

// 🎇 Floating Particles Animation
const float = keyframes`
  0% { transform: translateY(0px) scale(1); opacity: 0.6; }
  50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
  100% { transform: translateY(0px) scale(1); opacity: 0.6; }
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: radial-gradient(circle, #00ffff, rgba(0, 255, 255, 0.3));
  border-radius: 50%;
  animation: ${float} ${(props) => props.duration}s infinite ease-in-out;
  filter: blur(10px);
`;

// 🌟 Particles Container
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
  const [age, setAge] = useState("25");
  const [car, setCar] = useState("Tesla Model 3");

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <FullPageContainer>
      <Navbar />

      {/* ✨ Floating Particles */}
      <ParticleContainer>
        {[...Array(70)].map((_, i) => {
          const size = Math.random() * 25 + 15;
          const duration = Math.random() * 6 + 4;
          const left = Math.random() * 100;
          const top = Math.random() * 100;

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
          <Label>Car</Label>
          <StyledSelect value={car} onChange={(e) => setCar(e.target.value)}>
            <option>Tesla Model 3</option>
            <option>BMW i8</option>
            <option>Audi R8</option>
            <option>Mercedes G-Wagon</option>
          </StyledSelect>
        </InputContainer>

        <StyledButton onClick={handleSave}>Save Changes</StyledButton>
      </FormContainer>
    </FullPageContainer>
  );
}