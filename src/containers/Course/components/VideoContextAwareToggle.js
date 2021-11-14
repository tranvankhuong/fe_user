import React, {useContext} from "react";
import {useAccordionButton} from "react-bootstrap";
import AccordionContext from 'react-bootstrap/AccordionContext';

function VideoContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
  
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey),
    );
  
    const isCurrentEventKey = activeEventKey === eventKey;
  
    return (
      <button
        className = "d-flex justify-content-between course-section-card-button"
        type="button"
        // style={{ backgroundColor: isCurrentEventKey ? 'red' : 'green' }}
        onClick={decoratedOnClick}
      >
          <span>
          {children}
        </span>
        <span>
            {isCurrentEventKey ? '-' : '+'}
        </span>
      
      </button>
    );
  }
  export default VideoContextAwareToggle;