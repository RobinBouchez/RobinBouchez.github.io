import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import './QuestionsAccordion.css';
import { Users, Building2, MessageCircle } from 'lucide-react';

function QuestionsAccordion() {
  return (
    <div className='QuestionsWrapper'>
      <h2>
        How SwitchAroom Works
      </h2>
      <Accordion className='accordion-custom' defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Building2 size={50} className="mx-auto text-blue-600 mb-4" />
            <h3>List Your Room</h3>
          </Accordion.Header>
          <Accordion.Body>
            Create a detailed profile of your current housing and what you're looking for.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <Users size={50} className="mx-auto text-blue-600 mb-4" />
            <h3>Find Matches</h3>
          </Accordion.Header>
          <Accordion.Body>
            Our smart algorithm finds students with compatible housing needs.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <MessageCircle size={50} className="mx-auto text-blue-600 mb-4" />
            <h3>Connect & Swap</h3>
          </Accordion.Header>
          <Accordion.Body>
            Communicate safely and arrange your room exchange directly.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </ div>
  );
}

export default QuestionsAccordion;