import AddressService from "../../services/AddressService";
import '../addressbook-form/addressbokk-form.css'
import logo from '../../assets/logoAB.png'
import cancle from '../../assets/cancle.jpeg'
import React from 'react'
import { Link } from 'react-router-dom'

const addressService = new AddressService();
export default class Update extends React.Component {
    constructor() {
        super()
        this.state = {
            fullName: '',
            city: '',
            state: '',
            zip: '',
            mobNo: '',
            id: '',
            address: '',
            isUpdate: true,
            error: {
                fullName: '',
                city: '',
                state: '',
                zip: '',
                mobNo: '',
                address: ''
            }
        }
    }

    componentDidMount() {
        let contactId = localStorage.getItem('id');
        console.log(" contact id: ", contactId)
        addressService.getContactById(contactId).then((data) => {
            this.setState({ fullName: data.data.data.fullName })
            this.setState({ city: data.data.data.city })
            this.setState({ state: data.data.data.state })
            this.setState({ mobNo: data.data.data.mobNo })
            this.setState({ zip: data.data.data.zip })
            this.setState({ address: data.data.data.address })
        })
    }

    changeValue = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }


    validData = async () => {
        let isError = false;
        let error = {
            fullName: '',
            city: '',
            state: '',
            zip: '',
            address: '',
            mobNo: ''
        }

        if (this.state.fullName.length < 1) {
            error.fullName = 'Name is required field';
            isError = true;
        }

        if (this.state.city.length < 1) {
            error.city = 'City is required field';
            isError = true;
        }

        if (this.state.state.length < 1) {
            error.state = 'State is required field';
            isError = true;
        }

        if (this.state.zip.length < 1) {
            error.zip = 'Zip code is required field';
            isError = true;
        }

        if (this.state.mobNo.length < 1) {
            error.mobNo = 'Mobile No. is required field';
            isError = true;
        }

        if (this.state.address.length < 1) {
            error.address = 'Address is required field';
            isError = true;
        }

        await this.setState({ ...this.state, error: error });
        return isError;
    }

    update = async (event) => {
        event.preventDefault();
        console.log("save");

        if (await this.validData()) {
            console.log('error', this.state);
            return;
        }

        let object = {
            "fullName": this.state.fullName,
            "city": this.state.city,
            "state": this.state.state,
            "zip": this.state.zip,
            "address": this.state.address,
            "mobNo": this.state.mobNo,
            "id": this.state.id
        }

        addressService.updateContactData(localStorage.getItem('id'), object).then(data => {
            console.log(data);
            this.props.history.push('');
        }).catch(err => {
            console.log("Error while update");
        })
    }

    reset = () => {
        this.setState({ ...this.initialValue, id: this.state.id, isUpdate: this.state.isUpdate })
    }
    render() {
        return (
            <div className="addressbook-main" >
                <header className="header-container">
                    <div className="logo-content">
                        <img src={logo} alt="addressbook Logo" />
                        <div>
                            <span className="address">ADDRESS</span>
                            <span className="address book">BOOK</span>
                        </div>
                    </div>
                </header>

                <div className="address-container">
                    <form action="#" className="form" onsubmit="save(event)" onreset="reset()">
                        <div className="addressForm-head">PERSON ADDRESS FROM
                        <Link to=""><img src={cancle} style={{ float: 'right', paddingRight: 10 }} /></Link>
                        </div>
                        <div className="row-content space">
                            <label htmlFor="name" className="label text">Full Name</label>
                            <input type="text" className="input" id="name" name="fullName" onChange={this.changeValue} value={this.state.fullName} placeholder="Person name..." required />

                        </div>
                        <div className="row-content">
                            <label htmlFor="number" className="label number">Phone Number</label>
                            <input type="number" className="input" id="number" name="mobNo" onChange={this.changeValue} value={this.state.mobNo} placeholder="Enter Your no...." required />

                        </div>
                        <div className="row-content">
                            <label htmlFor="address" className="label text">Address</label>
                            <textarea name="address" id="address" className="input" onChange={this.changeValue} value={this.state.address} placeholder="Full Address..."
                                style={{ height: 100 }}></textarea>
                        </div>
                        <div className="row-content">
                            <div id="state">
                                <div className="city">
                                    <label htmlFor="city" className="label text">City</label>
                                    <select onChange={this.changeValue} name="city" id="city">
                                        <option value="city">Select City</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Orai">Orai</option>
                                        <option value="Kanpur">Kanpur</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Noida">Noida</option>
                                        <option value="Agra">Agra</option>
                                        <option value="Lucknow">Lucknow</option>
                                        <option value="Jhansi">Jhansi</option>
                                    </select>
                                </div>
                                <div className="state">
                                    <label htmlFor="state" className="label text">State</label>
                                    <select onChange={this.changeValue} name="state" id="state1">
                                        <option value="state">Select State</option>
                                        <option value="Maharastra">Maharastra</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Delhi">Delhi</option>
                                    </select>
                                </div>
                                <div className="zip">
                                    <label htmlFor="zip" className="label number">Zipcode</label>
                                    <select onChange={this.changeValue} name="zip" id="zip">
                                        <option value="zip">Zipcode</option>
                                        <option value="263521">263521</option>
                                        <option value="562358">562358</option>
                                        <option value="110011">110011</option>
                                        <option value="208016">208016</option>
                                        <option value="110001">110001</option>
                                        <option value="245163">245163</option>
                                        <option value="353570">353570</option>
                                        <option value="402060">402060</option>
                                        <option value="500060">500060</option>
                                        <option value="285001">285001</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row-content button-content">
                            <button className="add button" onClick={this.update} id="add">{this.state.isUpdate ? 'Update' : 'Submit'}</button>
                            <button className="reset button" onClick={this.reset} id="reset" type="reset">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
