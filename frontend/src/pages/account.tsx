
import Container from 'react-bootstrap/Container';

import './account.css'

import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import imagePic from '../components/assets/international-student-navigator-australia-xCzDFEFPK1w-unsplash.jpg';
import { Spinner } from 'react-bootstrap';

function AccountPage() {
    const { user } = useContext(UserContext) as { user: { firstName: string, lastName: string, quest: string, profilePic: string } };
    if (user == null) {
        return (
            <Container fluid="true" className="PageContainer">
                <Spinner animation="border" />
                <h2>Getting your account</h2>
            </Container>);
    } else {
        return (
            <Container fluid="true" className="PageContainer">
                <div className='accountWrapper'>
                    <div className="profile-card">
                        <img src={imagePic} alt={user.firstName} />
                        <h1>{user.firstName} {user.lastName}</h1>
                        <h2>as quest</h2>
                    </div>
                    <div className="profileInfo">
                        <h1>About {user.firstName}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptates debitis nam deleniti maiores facilis vero magnam vitae distinctio eius quae ducimus sequi veritatis, ea perspiciatis, sit non neque fugit.</p>
                    </div>
                </div>
            </Container>
        );
    }
}

export default AccountPage;
