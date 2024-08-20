import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BasicExample() {
  return (
    <Form className="row">
      <Form.Group className="mb-3 col-6" controlId="formBasicEmailPhone">
        <Form.Label>Email or Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter email or phone" />
      </Form.Group>
      <Form.Group className="mb-3 col-6" controlId="formBasicFullName">
        <Form.Label>Full name</Form.Label>
        <Form.Control type="text" placeholder="Enter full name" />
      </Form.Group>
      <Form.Group className="mb-3 col-12" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter address" />
      </Form.Group>
    </Form>
  );
}

export default BasicExample;
