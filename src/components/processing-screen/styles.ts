import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateReverse = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const rotateSlow = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.large};
  animation: ${pulse} 2s ease-in-out infinite;
  max-width: 400px;
  width: 90%;
`;

export const Spinner = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.medium};
`;

export const SpinnerRing = styled.div`
  position: absolute;
  border: 3px solid transparent;
  border-radius: 50%;

  &:nth-child(1) {
    width: 100%;
    height: 100%;
    border-top: 3px solid ${({ theme }) => theme.colors.primary};
    animation: ${rotate} 1.5s linear infinite;
  }

  &:nth-child(2) {
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    border-right: 3px solid ${({ theme }) => theme.colors.primaryDark};
    animation: ${rotateReverse} 1s linear infinite;
  }

  &:nth-child(3) {
    width: 40%;
    height: 40%;
    top: 30%;
    left: 30%;
    border-bottom: 3px solid ${({ theme }) => theme.colors.secondary};
    animation: ${rotateSlow} 2s linear infinite;
  }
`;

export const Message = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const SubMessage = styled.p`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: ${({ theme }) => theme.fontSizes.small};
  opacity: 0.8;
`;
