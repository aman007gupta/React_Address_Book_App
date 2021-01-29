import React from 'react'
import AddressService from "../../services/AddressService"
import { Link } from 'react-router-dom'
import deleteIcon from '../../assets/delete-black-18dp.svg';
import editIcon from '../../assets/create-black-18dp.svg';

const addressService = new AddressService()
export default class Display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contactArray: [],
            update: ''
        }
    }

    updateContactData = (contactId) => {
        localStorage.setItem('id', contactId)
    }

    deleteContact = (contactId) => {
        addressService.deleteContactData(contactId).then(() => {
            console.log("Deleted Successfully")
            this.setState({ update: 'updates' })
            this.props.callUpdate();
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <table id='table-display' className='table'>
                <tbody>
                    <tr key={-1}>
                        <th>Full Name </th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                    {
                        this.props.contactArray && this.props.contactArray.map((element, ind) => (
                            <tr key={element.srNo}>
                                <td>{element.fullName}</td>
                                <td>{element.address}</td>
                                <td>{element.city}</td>
                                <td>{element.state}</td>
                                <td>{element.zip}</td>
                                <td>{element.mobNo}</td>
                                <td><img onClick={() => this.deleteContact(element.srNo)} src={deleteIcon} alt="delete" />
                                    <Link to="update"> <img onClick={() => this.updateContactData(element.srNo)} src={editIcon} alt="edit" />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}