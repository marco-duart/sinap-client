import * as S from "./styles";
import logo from "../../assets/images/logo.svg";

interface Props {
  size?: "small" | "medium" | "large";
  message?: string;
}

export const LoadingSpinner = ({
  size = "medium",
  message = "Carregando...",
}: Props) => {
  return (
    <S.Container>
      <S.SpinnerWrapper $size={size}>
        <S.OrbitalRing $size={size} />
        <S.PulseRing $size={size} />
        <S.CentralImage src={logo} alt="Logo" $size={size} />
      </S.SpinnerWrapper>
      {message && <S.LoadingMessage>{message}</S.LoadingMessage>}
    </S.Container>
  );
};
