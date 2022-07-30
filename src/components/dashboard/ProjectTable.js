import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
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
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import React, { useState } from "react"; 

const tableData = [
  {
    logo: user1,
    name: "J.",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    description: "Outlet",
    address: "Islamabad",
  },
  {
    logo: user2,
    name: "J.",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    description: "Outlet",
    address: "Abbottabad",
  },
  {
    logo: user3,
    name: "J.",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    description: "Outlet",
    address: "Sargodha",
  },
  {
    logo: user4,
    name: "J.",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    description: "Outlet",
    address: "Lahore",
  },
  {
    logo: user5,
    name: "J.",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    description: "Outlet",
    address: "Karachi",
  },
];

const ProjectTables = () => {
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Card>
        <CardBody>
          {/* className="btn-primary text-end" */}
          {/* <CardTitle tag="h5">Shop Listing</CardTitle> */}
          {/* <Button >
            Add Shop
          </Button> */}
          <button
            className="btn btn-dark"
            data-toggle="modal"
            onClick={toggle}
          >
            Add Shop
          </button>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>

                <th>description</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.logo}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      {/* <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div> */}
                    </div>
                  </td>
                  <td>{tdata.name}</td>
                  {/* <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td> */}
                  <td>{tdata.description}</td>
                  <td>{tdata.address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 1000 }}>
        <ModalBody>
        <Form >

        <FormGroup>
          <Label for="exampleFile">Logo</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
           Upload Logo of your shop
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Shop Name</Label>
          <Input type="text" name="text" id="exampleText" placeholder="Enter Your Shop Name" />
        </FormGroup>



        <FormGroup>
          <Label for="exampleText">description</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Address</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>


  
        <Button>Submit</Button>
    </Form>

        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectTables;
