import Dropdown from 'react-bootstrap/Dropdown';

function ProfileMenu() {
  return (
<Dropdown>
    <Dropdown.Toggle className="dropdownButton">
      helo
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item eventKey="Belgium">Belgium</Dropdown.Item>
      <Dropdown.Item eventKey="United States">United States</Dropdown.Item>
      <Dropdown.Item eventKey="France">France</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileMenu;