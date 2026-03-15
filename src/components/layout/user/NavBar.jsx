import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Coffee, User } from 'lucide-react';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  
  .navbar-brand {
    font-weight: 700;
    color: var(--primary-btn);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-link {
    color: var(--text-main);
    font-weight: 500;
    margin: 0 12px;
    position: relative;
    transition: 0.3s;
    
    &.active {
      color: var(--primary-btn);
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--primary-btn);
        border-radius: 2px;
      }
    }
    
    &:hover {
      color: var(--accent-hover);
    }
  }
`;

const NavBar = () => {
  return (
    <StyledNavbar expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Coffee size={28} color="var(--primary-btn)" />
          Dehofee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/explore">Explore</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login" className="d-flex align-items-center gap-2">
              <User size={20} />
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default NavBar;
