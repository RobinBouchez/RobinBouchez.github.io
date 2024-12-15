
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import { axiosInstance } from '../lib/axios';

import './FAQ.css'

import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Spinner } from 'react-bootstrap';

function FAQ() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitting question');
    const response = await axiosInstance.get(`/faq?question=${encodeURIComponent(question)}`);
    const data = response.data;
    setResponse(data.aiResponse);
  }

    const { user } = useContext(UserContext);
    if (user == null) {
        return (
            <Container fluid="true" className="PageContainer">
                <Spinner animation="border" />
                <h2>Getting your account</h2>
            </Container>);
    } else {
        return (
                <div className='FAQWrapper'>
                    <form className='FAQForm' onSubmit={handleSubmit}>
                      <label htmlFor='question' className='FAQLabel'>
                        Ask a question
                      </label>
                      <input className='FAQinput' type="text" value={question} onChange={(e => setQuestion(e.target.value))} />
                      <button className='FAQButton' type='submit'>
                        submit
                      </button>

                    </form>
                    {response && <div className='FAQResponse'>{response}</div>}
                </div>
        );
    }
}

export default FAQ;
