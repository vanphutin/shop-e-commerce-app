import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CiMoneyCheck1 } from "react-icons/ci";

function FormPay() {
  return (
    <Form className="">
      <div className="form__details row">
        <h6 className="title fw-bolder my-2">Enter info details</h6>
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
      </div>
      <div className="form__pay">
        <h6 className="title fw-bolder my-2">Enter info card</h6>
        <Form.Group className="mb-3 col-12" controlId="formBasicAccountBanking">
          <Form.Label>Banking </Form.Label>
          <Form.Control
            type="text"
            className="text-uppercase"
            placeholder="MBBANK"
          />
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="formBasicAccountNumber">
          <Form.Label>Account number</Form.Label>
          <Form.Control type="text" placeholder="123456" />
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="formBasicAccounNamet">
          <Form.Label>Name account</Form.Label>
          <Form.Control
            type="text"
            className="text-uppercase"
            placeholder="JOD AN"
          />
        </Form.Group>
      </div>
    </Form>
  );
}

export default FormPay;
