import React, { Component } from "react";

import "./App.css";
import "./App.js";



class ProductContainer extends Component {
  constructor(props){
    super(props);
    this.state = { product: [] }
  }

  getProductsbyID(id){
   let url = `/api/v1/products/${id}`
    fetch(url)
    .then(res => res.json())
    .then(product => { this.setState({ product: product[0] })})
  }

  componentDidMount() {
    this.getProductsbyID(this.props.match.params.id);
  };

  render(){
    return (
      <div className="container-fluid">
        <div className="product-container col-md-6 p-auto">
          <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
              <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                      <img className="d-block w-100" src={"" + this.state.product.path_1} alt="First slide"/>
                  </div>
                  <div className="carousel-item">
                      <img className="d-block w-100" src={"" + this.state.product.path_2} alt="Second slide"/>
                  </div>
                  <div className="carousel-item">
                      <img className="d-block w-100" src={"" + this.state.product.path_3} alt="Third slide"/>
                  </div>
                  <div className="carousel-item">
                      <img className="d-block w-100" src={"" + this.state.product.path_4} alt="Third slide"/>
                  </div>
              </div>

              <a className="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                  <span className="fas fa-chevron-left" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                  <span className="fas fa-chevron-right" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
              </a>
              <ol className="carousel-indicators">
                  <li data-target="#carousel-thumb" data-slide-to="0" className="active"> <img className="d-block w-100" src={"" + this.state.product.path_1} className="img-fluid"/></li>
                  <li data-target="#carousel-thumb" data-slide-to="1"><img className="d-block w-100" src={"" + this.state.product.path_2} className="img-fluid"/></li>
                  <li data-target="#carousel-thumb" data-slide-to="2"><img className="d-block w-100" src={"" + this.state.product.path_3} className="img-fluid"/></li>
                  <li data-target="#carousel-thumb" data-slide-to="3"><img className="d-block w-100" src={"" + this.state.product.path_4} className="img-fluid"/></li>

              </ol>
          </div>
        </div>
        <div className="product-description col-md-6 pb-5">
            <h1>{this.state.product.name}</h1>
            <p className="text-description py-5 pr-3 mr-5">{this.state.product.description}</p>
          <div className="row text-center">
            <div className="col-3 text-left">
              <h2 className="pb-3">${this.state.product.price}.00</h2>
            </div>
            <div className="col-4">
              <h2 className="pb-3">Try it at Home</h2>
              <img className="qrcode" alt="" src={this.state.product.qrcode}/>
            </div>
            <div className="col-4">
              <h2 >Contact Supplier</h2>
              <p className="contactIcons d-flex justify-content-around">
              <a href="http://store.hermanmiller.com/dining/dining-chairs/eames-molded-plastic-wire-base-side-chair-dsr/1153.html?lang=en_US&" target="_blank"><i class="fas fa-globe"></i></a>
              <a href="mailto:info@hermanmiller.com"><i class="fas fa-envelope pr-2"></i></a>
                <a href="tel:514-555-1234"><i class="fas fa-phone"></i></a></p>
            </div>
          </div>
        </div>
      </div>
     );
  }
}


export default ProductContainer;
