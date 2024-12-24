import logo from "./../../assets/logo.png";
import { FooterContainer, ImageFooterContainer } from "./styles";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export default function Footer() {
  return (
    <FooterContainer>
      <ImageFooterContainer className="image">
        <img src={logo} alt="Logo Clique Loque" />
      </ImageFooterContainer>

      <p>&copy; 2022 - {currentYear} Construindo Patrimônios</p>
    </FooterContainer>
  );
}
