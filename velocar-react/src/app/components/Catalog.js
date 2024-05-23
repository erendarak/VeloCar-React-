'use client'
import Link from "next/link";
import { useContext } from "react";
import { ApplicationContext } from "./ApplicationContext"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Table } from 'reactstrap';

export default function Catalog({ tableHeader, carList }) {
    const contextObject = useContext(ApplicationContext);

    return (<div>
        <h3>{tableHeader}</h3>
        <h5>{contextObject.data}</h5>
        <Table bordered hover responsive striped>
            <thead>
                <tr><th>Name</th><th>Price</th><th>Description</th><th>Delete</th><th>Operations</th></tr>
            </thead>
            <tbody>
                {carList.map((item, index) => {
                    return (<tr key={index}>
                        <td>
                            <Link href={"/pages/" + item.id}>{item.title}</Link>
                        </td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                    </tr>
                    );
                })}
            </tbody>
            </Table>
        
    </div>

    );
}