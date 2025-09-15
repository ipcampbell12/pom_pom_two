import React, { useState } from "react";
import FormInput from "../UI/FormInput";
import Button from "../UI/Button";
import { Form } from "react-bootstrap";
import Heading from "../UI/Heading";
import { submitUserForm } from "../ApiCalls";
import AlertMessage from "../UI/Alert";
import { onFailure, onSuccess } from "../Utilities/AlertHelpers";

// <Heading level="1" children="My Cool Form" />
export default function NewUserForm() {
    const [form, setForm] = useState({
        age: "",
        username: "",
        password: "",
        email: "",
        gender: "",
        userType: "",
        zipcode: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const fillTestData = () => {
        setForm({
            age: "18-24",
            username: "Crazy_Unicorn_9000_!!!",
            email: "ridiculous.email+testing@example.com",
            gender: "female",
            userType: "Host",
            zipcode: "97219"
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        const newErrors = {};
        if (!form.age) newErrors.age = "Age Range is required";
        if (!form.username) newErrors.username = "Username is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.gender) newErrors.gender = "Gender is required";
        if (!form.userType) newErrors.userType = "User type is required";
        if (!form.zipcode) newErrors.zipcode = "Zipcode is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            const successHandler = (res) => {
                console.log("GAS response:", res);

                if (res.status === "error") {
                    setForm({ age: "", username: "", email: "", gender: "", userType: "", zipcode: "" }); // reset form
                    setAlert(onFailure(res.message, () => setAlert(null)));
                    setIsSubmitting(false);
                } else {
                    setForm({ age: "", username: "", email: "", gender: "", userType: "", zipcode: "" }); // reset form
                    setAlert(onSuccess(res.message, () => setAlert(null)));
                    setIsSubmitting(false);
                }
            };

            submitUserForm(form, successHandler);
        }
    };


    return (

        <Form onSubmit={handleSubmit}>
            <Heading level="1" children="My Cool Form" />
            <Button type="button" onClick={fillTestData} style={{ marginBottom: "1rem" }}>
                Fill Test Data 🤪
            </Button>

            <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age range</Form.Label>
                <Form.Select
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    isInvalid={!!errors.age}
                >
                    <option value="">Select an Age Range</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                </Form.Select>
                {errors.age && <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>}
            </Form.Group>

            <FormInput
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                error={errors.username}
            />


            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Zipcode"
                name="zipcode"
                value={form.zipcode}
                onChange={handleChange}
                placeholder="Enter your zipcode"
                error={errors.zipcode}
            />

            <FormInput
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
            />

            <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    isInvalid={!!errors.gender}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
                {errors.gender && <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="userType">
                <Form.Label>User Type</Form.Label>
                <Form.Select
                    name="userType"
                    value={form.userType}
                    onChange={handleChange}
                    isInvalid={!!errors.userType}
                >
                    <option value="">Select a User Type</option>
                    <option value="Host">Host</option>
                    <option value="Participant">Participant</option>
                </Form.Select>
                {errors.userType && <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>}
            </Form.Group>
            {alert && <AlertMessage {...alert} />}


            <Button type="submit" isLoading={isSubmitting}>
                Submit
            </Button>
        </Form>
    );
}
