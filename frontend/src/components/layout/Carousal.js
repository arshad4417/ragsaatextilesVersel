import React from 'react'

const Carousal = () => {
    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1900x600/?clothing"  className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Welcome to RagsaaTextiles</h1>
                            <p>RagsaaTextiles - Fashion Store on Your Hand</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/1900x600/?textiles" className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Welcome to RagsaaTextiles</h1>
                            <p>RagsaaTextiles - Fashion Store on Your Hand</p>
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <img src="https://www.liveborders.org.uk/wp-content/uploads/2019/02/web-banner-bk.png" className="d-block w-100" alt="..." width="100vw"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Welcome to RagsaaTextiles</h1>
                            <p>RagsaaTextiles - Fashion Store on Your Hand</p>
                        </div>
                    </div> */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousal