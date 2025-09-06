import React, { useState } from "react";
import FormInput from "../UI/FormInput";
import Button from "../UI/Button";
import { Form } from "react-bootstrap";
import Heading from "../UI/Heading";

// <Heading level="1" children="My Cool Form" />
export default function FormExample() {
    const [form, setForm] = useState({
        dob: "",
        username: "",
        email: "",
        gender: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        const newErrors = {};
        if (!form.dob) newErrors.dob = "Date of birth is required";
        if (!form.username) newErrors.username = "Username is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.gender) newErrors.gender = "Gender is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            console.log("Form submitted:", form);
            // TODO: call server-side Google Apps Script function if needed
            setTimeout(() => setIsSubmitting(false), 1000);
        }
    };

    return (

        <Form onSubmit={handleSubmit}>
            <Heading level="1" children="My Cool Form" />
            <FormInput
                label="Date of Birth"
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                error={errors.dob}
            />

            <FormInput
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                error={errors.username}
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

            <Button type="submit" isLoading={isSubmitting}>
                Submit
            </Button>
        </Form>
    );
}
