import React from 'react';
// import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {Link} from "react-router-dom";
import {auth} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {createStructuredSelector} from "reselect";
import {selectCartHidden} from "../../redux/cart/cart.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer} from "./header.styles";




const Header=({currentUser, hidden})=>(
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo">

            </Logo>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/">
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    (<OptionLink as='div' div onClick={()=>auth.signOut()}>SIGN OUT</OptionLink>)
                :
                    (
                <OptionLink
                     to='/signin'
                >SIGN IN</OptionLink>)
            }
            <CartIcon></CartIcon>
        </OptionsContainer>
        { hidden ? null :
            <CartDropdown>

            </CartDropdown>

        }
    </HeaderContainer>
);
// export default Header;
const mapStateToProps=createStructuredSelector({currentUser:selectCurrentUser,
hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
