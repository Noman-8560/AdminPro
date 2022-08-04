import {
  Card,
  CardBody,
  Form,
  Table,
  Button,
  ModalBody,
  Modal,
  Label,
  Input,
  FormText,
  FormGroup,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useAlert } from "react-alert";

const ProjectTables = () => {
  const [modal, setModal] = React.useState(false);
  // const alert = useAlert();
  const toggle = () => setModal(!modal);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [images, setImages] = useState("");
  const [services, setServices] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const getservices = (e) => {
    const { value, checked} = e.target
    if(checked){
      setServices([...services, value])
    } else{
      setServices(services.filter((e) => e !== value))
    }
  };

  useEffect(() => {
    Clinics();
  }, []);

  const Clinics = async () => {
    try {
      const recponse = await fetch("http://127.0.0.1:8000/shop/list/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("GETTING RESPONSE");
      setTableData(await recponse.json());
    } catch (error) {}
  };

  const handleAPi = (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/shop/list/";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("phone_number", phone_number);
    formData.append("images", images);
    formData.append("services", services);
    console.log("TESTING");
    console.log(services);
    console.log("TESTING");
    axios.post(url, formData).then((res) => {
      console.log(res);
      toggle();
      Clinics();
    });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <button className="btn btn-dark" data-toggle="modal" onClick={toggle}>
            Add Shop
          </button>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Description</th>
                <th>Services</th>
                <th>Address</th>

              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={`http://127.0.0.1:8000${tdata.images}`}
                        className="rounded-circle"
                        alt="Logo"
                        width="45"
                        height="45"
                      />
                    </div>
                  </td>
                  <td>{tdata.name}</td>
                  <td>{tdata.description}</td>
                  <td>{tdata.services}</td>
                  <td>{tdata.address}</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        isOpen={modal}
        show={showEdit}
        block
        toggle={toggle}
        modalTransition={{ timeout: 1000 }}
      >
        <ModalBody>
          <Form onSubmit={(e) => handleAPi(e)}>
            <FormGroup>
              <Label for="exampleFile">Logo</Label>
              <Input
                type="file"
                name="images"
                onChange={(e) => setImages(e.target.files[0])}
              />
              <FormText color="muted">Upload Logo of your shop</FormText>
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Shop Name</Label>
              <Input
                type="text"
                name="name"
                value={name}
                id="exampleText"
                placeholder="Enter Your Shop Name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Contact No</Label>
              <Input
                type="text"
                name="phone_number"
                value={phone_number}
                placeholder="Enter Your Contact Number"
                onChange={(e) => setPhone_Number(e.target.value)}
              />
            </FormGroup>

            <Label for="exampleText">Select Types Service's</Label>
            <FormGroup check>
              <Input
                type="checkbox"
                value="Inventory"
                onChange={(e) => getservices(e)}
              />{" "}
              <Label check>Inventory</Label>
            </FormGroup>

            <FormGroup check>
              <Input
                type="checkbox"
                value="POS"
                onChange={(e) => getservices(e)}
              />{" "}
              <Label check>Point of Sale(POS)</Label>
            </FormGroup>

            <FormGroup check>
              <Input
                type="checkbox"
                value="Invoice"
                onChange={(e) => getservices(e)}
              />{" "}
              <Label check>Invoice</Label>
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Description</Label>
              <Input
                type="textarea"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Address</Label>
              <Input
                type="textarea"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>

            <Button type="submit">Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectTables;
