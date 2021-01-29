import React from 'react'
import logo from '../../assets/logoAB.png'
import Add from '../../assets/add-24px.svg'
import AddressService from '../../services/AddressService'
import './home.css'
import Display from './display'
import { Link } from 'react-router-dom'

const addressService = new AddressService();
export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            contactArray: [],
            callUpdate: ''
        }
    }

    componentDidMount() {
        this.getAddressDetail()
    }

    update = () => {
        this.getAddressDetail()
    }

    getAddressDetail = () => {
        addressService.getAllContactData().then(data => {
            this.setState({contactArray: data.data.data});
        }).catch(err => {
            console.log(err)
        })  
    }
    
    render() {
        return (
            <div>
                <header className="header-container">
                    <div className="logo-content">
                        <img src={logo} alt="addressbook Logo" />
                        <div>
                            <span className="address">ADDRESS</span>
                            <span className="address book">BOOK</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="header-content">
                        <div className="address-detail-text">Person Details <div className="contact-count">{this.state.contactArray.length}</div></div>
                        <Link to="AddressBookForm" className="add-button"><img src={Add} alt="" />Add Person</Link>
                    </div>
                    <div className="table-main">
                        <table className="table" id="display">
                            <Display contactArray={this.state.contactArray} callUpdate={this.update}/>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}