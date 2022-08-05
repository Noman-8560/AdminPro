import React, { useEffect, useState } from 'react'
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import {useAlert} from 'react-alert'
const AddForm = ({onClose,getData,singleMember}) => {
    const [data, setData] = useState({
        fName: singleMember?singleMember.first_name:'',
        lName: singleMember?singleMember.last_name:'',
        date: singleMember? singleMember.date_of_birth:'',
        relation: singleMember?singleMember.relation:''
    })
    const alert = useAlert();
    const handleData = (e) => {
        setData((pre) => (
            { ...pre, [e.target.name]: e.target.value }
        ))
        console.log(data);
    }


    const createMember = (e)=>{
        var Date1 = data.date;
            var correctFormat = Date1.split("-");

            var actualDate =
                correctFormat[1] + "/" + correctFormat[2] + "/" + correctFormat[0];
        console.log(actualDate);
        let token = localStorage.getItem("Authorization");
        return axios.post("https://nichecare.pythonanywhere.com/api/my/relatives/",{
            "first_name": data.fName,
            "last_name": data.lName,
            "date_of_birth": actualDate,
            "relation": data.relation
        },{
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
    
        })
    }

    const editMember = ()=>{
        var Date1 = data.date;
            var correctFormat = Date1.split("-");

            var actualDate =
                correctFormat[1] + "/" + correctFormat[2] + "/" + correctFormat[0];
        console.log(actualDate);
        let token = localStorage.getItem("Authorization");
        return axios.put(`https://nichecare.pythonanywhere.com/api/my/relatives/${singleMember.pk}/`,{
            "first_name": data.fName,
            "last_name": data.lName,
            "date_of_birth": actualDate,
            "relation": data.relation
        },{
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
    
        })
    }

    const performOperatoin = (e,value)=>{
        e.preventDefault();

        let axiosCall;
        console.log(singleMember)
        console.log(value)
        if(value==true){
            axiosCall = editMember();
            
        }
        else{
            axiosCall = createMember();
            console.log('Hello Bhai');
        }

        axiosCall
        .then(response =>{
            console.log(response);
            if(response.status>=200 && response.status<=299){
                alert.success('Member created successfully');
                onClose()
                getData()

            }
            else{
                alert.error('There is an error');
            }
        })
        .catch(err =>{
            alert.error('There is an error');
            console.log(err.message);
        })
    }

    return (
        <div><Form onSubmit={ (e)=>performOperatoin(e,singleMember.first_name? true:false)} >

            <Form.Group className="mt-2">

                <Form.Control
                    type="text"
                    placeholder="Firstname *"
                    name="fName"
                    value={data.fName}
                    onChange={handleData}
                    required
                />
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Control
                    type="text"
                    placeholder="Lastname *"
                    name="lName"
                    value={data.lName}
                    onChange={handleData}
                    required
                />
            </Form.Group>

            <Form.Group className="mt-2 d-flex " >
                <Form.Label className="w-25 mt-3">
                    Date of Birth
                </Form.Label>
                <Form.Control className="w-75"
                    type="date"
                    placeholder="U"
                    name="date"
                    value={data.date}
                    onChange={handleData}
                    format="MM/DD/YYYY"
                    required
                />
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Control
                    type="text"
                    placeholder="Relationship (son,daughter etc)..."
                    name="relation"
                    value={data.relation}
                    onChange={handleData}
                    required
                />
            </Form.Group>

            <div style={{ width: '100%', textAlign: 'end' }}>
                <Button
                    // onClick={createMember} 

                    variant="primary" type="submit" className="mt-2">
                    Save
                </Button>
            </div>
        </Form></div>
    )
}

export default AddForm