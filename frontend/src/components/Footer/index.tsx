import { FooterContainer } from './styles';

export default function Footer() {
  return (
    <FooterContainer>
      © {new Date().getFullYear()} Bruno Alves. All rights reserved.
    </FooterContainer>
  );
}