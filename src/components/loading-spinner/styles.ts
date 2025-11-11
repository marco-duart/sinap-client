import styled, { keyframes } from 'styled-components';

const orbit = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xlarge};
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const SpinnerWrapper = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => {
    switch ($size) {
      case 'small': return '160px';
      case 'medium': return '240px';
      case 'large': return '320px';
      default: return '120px';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'small': return '160px';
      case 'medium': return '240px';
      case 'large': return '320px';
      default: return '120px';
    }
  }};
`;

export const OrbitalRing = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border: ${({ $size }) => {
    switch ($size) {
      case 'small': return '3px solid';
      case 'medium': return '4px solid';
      case 'large': return '5px solid';
      default: return '4px solid';
    }
  }};
  border-color: ${({ theme }) => theme.colors.primary} transparent transparent transparent;
  border-radius: 50%;
  animation: ${orbit} 1.5s linear infinite;
`;

export const PulseRing = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  position: absolute;
  width: ${({ $size }) => {
    switch ($size) {
      case 'small': return '70%';
      case 'medium': return '75%';
      case 'large': return '80%';
      default: return '75%';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'small': return '70%';
      case 'medium': return '75%';
      case 'large': return '80%';
      default: return '75%';
    }
  }};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid ${({ theme }) => theme.colors.primaryDark};
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite reverse;
  }
`;

export const CentralImage = styled.img<{ $size: 'small' | 'medium' | 'large' }>`
  width: ${({ $size }) => {
    switch ($size) {
      case 'small': return '80px';
      case 'medium': return '160px';
      case 'large': return '300px';
      default: return '60px';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'small': return '80px';
      case 'medium': return '160px';
      case 'large': return '300px';
      default: return '60px';
    }
  }};
  object-fit: contain;
  z-index: 2;
  position: relative;
`;

export const LoadingMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  text-align: center;
  margin: 0;
  max-width: 200px;
  line-height: 1.4;
`;