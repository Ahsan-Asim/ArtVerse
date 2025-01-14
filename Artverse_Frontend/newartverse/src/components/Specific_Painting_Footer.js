import React from 'react';

function Specific_Painting_Footer() {
  return (
    <div>

<footer style={{
  width: '1219px',
  height: '541px',
  backgroundColor: '#f8f8f8',
  display: 'flex',
  padding: '20px',
  margin: '0 auto',
  position:'absolute',
  left: '5px',
  top: '4800px'
}}>
  {/* Logo */}
  <div style={{
    width: '253px',
    height: '329px',
    backgroundImage: `url(${require('../assets/images/ArtVerse_Logo.png')})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }}></div>

  {/* Footer Content */}
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '914px',
    height: '279px',
    paddingLeft: '30px',
  }}>
    {/* Column 1 */}
    <div>
      <h4 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>For Collectors</h4>
      <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.6' }}>
        <li>Digital Art / NFTs</li>
        <li>Art Category</li>
        <li>Artist</li>
        <li>Seller Forum</li>
        <li>Collector’s Support</li>
      </ul>
    </div>

    {/* Column 2 */}
    <div>
      <h4 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Drawing</h4>
      <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.6' }}>
        <li>M.F Hussain</li>
        <li>Sell Your Art</li>
        <li>Resell Work</li>
        <li>Sh Raza</li>
        <li>Artverse For Sellers</li>
        <li>Collector’s FAQ</li>
      </ul>
    </div>

    {/* Column 3 */}
    <div>
      <h4 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Art By Price</h4>
      <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.6' }}>
        <li>Paintings</li>
        <li>Under Rs 2500</li>
        <li>Photography</li>
        <li>Rs 25000 - Rs 1 lac</li>
        <li>Print Making</li>
        <li>Rs 1 lac - Rs 3 lac</li>
        <li>Sculpture</li>
      </ul>
    </div>

    {/* Column 4 */}
    <div>
      <h4 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Services</h4>
      <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.6' }}>
        <li>Jatin</li>
        <li>Sellers FAQ</li>
        <li>Ahsan Asim</li>
        <li>Support</li>
        <li>Bon Proctor</li>
        <li>Sellings KYC</li>
        <li>Laxmi Kaur</li>
        <li>Victor Frankl</li>
        <li>Rohit Kumar</li>
      </ul>
    </div>
  </div>
</footer>

      
    </div>
  )
}

export default Specific_Painting_Footer;
