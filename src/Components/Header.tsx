import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  margin-right: 50px;
  width: 95px;
  height: 25px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.lighter};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.darker};
  }
`;

const Circle = styled(motion.span)`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -8px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 40px;
  svg {
    height: 20px;
    cursor: pointer;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  ::placeholder {
    color: white;
  }
`;

interface IForm {
  keyword: string;
}

function Header() {
  // Set FontAwesomeIcons
  library.add(fas);
  const magnifyingGlassLookup: IconLookup = {
    prefix: "fas",
    iconName: "magnifying-glass",
  };
  const magnifyingGlassDefinition: IconDefinition = findIconDefinition(
    magnifyingGlassLookup
  );

  // Url Matches
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");

  const [searchOpen, setSearchOpen] = useState(false);

  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  const openSearchBar = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  const { scrollY } = useScroll();

  const navVariants = {
    top: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    scroll: {
      backgroundColor: "rgba(0,0,0,1)",
    },
  };

  // Scroll event
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  const logoImg = require(`../assets/images/JFLIX.png`);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo src={logoImg} />
        <Items>
          <Link to="/">
            <Item>Home {homeMatch && <Circle layoutId="circle" />}</Item>
          </Link>
          <Link to="/tv">
            <Item>TV Shows {tvMatch && <Circle layoutId="circle" />}</Item>
          </Link>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={openSearchBar}
            animate={{ x: searchOpen ? -190 : 0 }}
            transition={{ type: "linear" }}
            viewBox="0 0 20 20"
          >
            <FontAwesomeIcon icon={magnifyingGlassDefinition} />
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            placeholder="Title,  Actor,  Genre ..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
