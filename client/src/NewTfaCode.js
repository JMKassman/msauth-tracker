import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import React, { useContext, useState } from "react"

import { UserContext } from './context/UserContext'

function NewTfaCode(props) {
    const [tfaCode, setTfaCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState("")
    const [userContext,] = useContext(UserContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return
        }
        setIsSubmitting(true)
        setError("")

        const genericErrorMessage = "Something went wrong! Please try again later."

        fetch(process.env.REACT_APP_API_ENDPOINT + "data/newTfaCode", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext.token}`,
            },
            body: JSON.stringify({ code: tfaCode }),
        }).then(async res => {
            setIsSubmitting(false)
            switch (res.status) {
                case 400:
                    setError("Ensure all fields are filled in")
                    break;
                case 200:
                    props.refreshHandler()
                    props.setKey("dataTable")
                    break;
                default:
                    setError(genericErrorMessage)
                    break;
            }
        })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })
    }

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="newTfaCode">
                    <Form.Label>Authenticator Code</Form.Label>
                    <InputGroup>
                        <Form.Control required type="number" step="1" placeholder="Code" onChange={e => setTfaCode(e.target.value)} value={tfaCode} />
                        <Form.Control.Feedback type="invalid">
                            Please enter the MS Authenticator number.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {`${isSubmitting ? "Submitting" : "Submit"}`}
                </Button>
            </Form>
        </>
    )
}

export default NewTfaCode