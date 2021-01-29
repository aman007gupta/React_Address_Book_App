import { useState } from "react";
import AddressService from "../../services/AddressService";
import './addressbokk-form.css'
import logo from '../../assets/logoAB.png'
import cancle from '../../assets/cancle.jpeg'
import React from 'react'
import { Link } from 'react-router-dom'

const addressService = new AddressService();
const AddressBookForm = (props) => {
    let initialValue = {
        fullName: '',
        city: '',
        state: '',
        zip: '',
        mobNo: '',
        id: '',
        address: '',
        isUpdate: false,
        error: {
            fullName: '',
            city: '',
            state: '',
            zip: '',
            mobNo: '',
            address: ''
        }
    }

    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const validData = async () => {
        let isError = false;
        let error = {
            fullName: '',
            city: '',
            state: '',
            zip: '',
            address: '',
            mobNo: ''
        }

        if (formValue.fullName.length < 1) {
            error.fullName = 'Name is required field';
            isError = true;
        }

        if (formValue.city.length < 1) {
            error.city = 'City is required field';
            isError = true;
        }

        if (formValue.state.length < 1) {
            error.state = 'State is required field';
            isError = true;
        }

        if (formValue.zip.length < 1) {
            error.zip = 'Zip code is required field';
            isError = true;
        }

        if (formValue.mobNo.length < 1) {
            error.mobNo = 'Mobile No. is required field';
            isError = true;
        }

        if (formValue.address.length < 1) {
            error.address = 'Address is required field';
            isError = true;
        }

        await setForm({ ...formValue, error: error });
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        console.log("save");

        if (await validData()) {
            console.log('error', formValue);
            return;
        }

        let object = {
            "fullName": formValue.fullName,
            "city": formValue.city,
            "state": formValue.state,
            "zip": formValue.zip,
            "address": formValue.address,
            "mobNo": formValue.mobNo,
            "id": formValue.id
        }

        addressService.addContact(object).then(data => {
            console.log(data);
            props.history.push('');
        }).catch(err => {
            console.log("Error while Add");
        })
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate })
    }

    return (
        <div className="addressbook-main">
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
                <form action="#" className="form" onSubmit={save} >
                    <div className="addressForm-head">PERSON ADDRESS FROM
                        <Link to=""><img src={cancle} style={{ float: 'right', paddingRight: 10 }} /></Link>
                    </div>
                    <div className="row-content space">
                        <label htmlFor="name" className="label text">Full Name</label>
                        <input type="text" className="input" id="name" name="fullName" value={formValue.fullName} onChange={changeValue} placeholder="Person name..." />

                    </div>
                    <div className="error">{formValue.error.name}</div>
                    <div className="row-content">
                        <label htmlFor="number" className="label number">Phone Number</label>
                        <input type="number" className="input" id="number" name="mobNo" value={formValue.mobNo} onChange={changeValue} placeholder="Enter Your no...." />

                    </div>
                    <div className="error">{formValue.error.mobNo}</div>
                    <div className="row-content">
                        <label htmlFor="address" className="label text">Address</label>
                        <textarea name="address" id="address" className="input" value={formValue.address} onChange={changeValue} placeholder="Full Address..."
                            style={{ height: 100 }}></textarea>
                    </div>
                    <div className="row-content">
                        <div id="state">
                            <div className="city">
                                <label htmlFor="city" className="label text">City</label>
                                <select onChange={changeValue} name="city" id="city">
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
                                <select onChange={changeValue} name="state" id="state1">
                                    <option value="state">Select State</option>
                                    <option value="Maharastra">Maharastra</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                            </div>
                            <div className="zip">
                                <label htmlFor="zip" className="label number">Zipcode</label>
                                <select onChange={changeValue} name="zip" id="zip">
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
                        <button className="add button" onClick={save} id="add">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                        <button className="reset button" onClick={reset} id="reset" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddressBookForm