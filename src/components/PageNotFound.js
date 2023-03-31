import React from 'react';

const PageNotFound = () => {
    return (
        <>  
            <h1 className='error-msg' style={{ display: 'block', width: '100%' }}>404: Page not found</h1>
            <img className='error-img' src={'/images/errors/general.png'} />
        </>
    )
} 

export default PageNotFound;