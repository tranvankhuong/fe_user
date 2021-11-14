//import { useState, Button } from 'react';
//import Modal from 'react-modal';
import React  from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Modal() {
    const history = useHistory();

    const handleOrderSuccess = () =>{
        console.log("Btn rating clicked");
        history.push('/')

    }
    return (
      <>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Order Now
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Order Success
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
            <span aria-hidden="true">Thank you for your order</span>
            </div>
            <div class="modal-footer">
                <Button variant="success" className="btn btn-primary" onClick={handleOrderSuccess}  data-dismiss="modal" size="sm">Success</Button>
            </div>
            </div>
        </div>
        </div>
        
      </>
      
    );
  }
  
  export default Modal;