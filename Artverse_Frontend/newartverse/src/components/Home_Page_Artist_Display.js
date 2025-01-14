import React from 'react'

function Home_Page_Artist_Display() {
  return (
    <div>

<div style={{ textAlign: 'center', marginTop: '100px' }}>
  {/* Heading */}
  <h2 style={{
    fontFamily: 'Aleo, sans-serif',
    fontWeight: '600', 
    fontSize: '38px',
    width: '421px',
    margin: '0 auto',
    color: '#333',
    marginBottom: '30px',
  }}>Meet Our Artists</h2>

  {/* Artist Section */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '50px',
  }}>
    {/* Artist Card */}
    {[1, 2, 3, 4].map((artist, index) => (
      <div key={index} style={{
        width: '242px',
        textAlign: 'center',
        borderRadius: '50px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: '#FFF',
      }}>
        <div style={{
          width: '100%',
          height: '207px',
          borderRadius: '50px',
          backgroundImage: `url(${require('../assets/images/Artist_Image.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        
        {/* Artist Name */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '26.4px',
          fontWeight: '400',
          color: '#333',
          marginTop: '20px',
        }}>Rohit Kumar</p>

        {/* Star Rating */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}>
          {[1, 2, 3, 4].map((star, idx) => (
            <img
              key={idx}
              src="../assets/images/Artist_Stars.png"
              alt="Star"
              style={{
                width: '45.69px',
                height: '17.6px',
                marginRight: '2px',
              }}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

      
    </div>
  )
}

export default Home_Page_Artist_Display;
