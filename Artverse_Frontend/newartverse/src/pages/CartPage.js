import React from "react";
import "../styles/Cart_page.css";
import ArtistStudioHeader from "../components/Artist_studio_header.js";
import Item_cart from "../components/Item_cart.js";
import ArtistStudioFooter from "../components/Artist_studio_footer.js";

function CartPage() {
  return (
    <div className="cartpage">
      <ArtistStudioHeader />
      <Item_cart />
      <ArtistStudioFooter />
    </div>
  );
}

export default CartPage;
