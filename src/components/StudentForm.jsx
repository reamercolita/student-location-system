import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { geocodeAddress } from '../utils/geocode'

const initialForm = {
  firstname: '',
  lastname: '',
  course: '',
  email: '',
  address: '',
}

function validate(values) {
  const errors = {}

  if (!values.firstname.trim()) {
    errors.firstname = 'Firstname is required.'
  }

  if (!values.lastname.trim()) {
    errors.lastname = 'Lastname is required.'
  }

  if (!values.course.trim()) {
    errors.course = 'Course is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.address.trim()) {
    errors.address = 'Address is required.'
  } else if (values.address.trim().length < 5) {
    errors.address = 'Enter a more complete address.'
  }

  return errors
}

function FieldLabel({ children, required = true }) {
  return (
    <Form.Label className="small fw-bold text-slate-700 mb-2">
      {children}

      {required && (
        <span className="text-danger"> *</span>
      )}
    </Form.Label>
  )
}

export default function StudentForm({ onRegister }) {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }))

    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate(formData)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitError('')

      const location = await geocodeAddress(
        formData.address.trim(),
      )

      onRegister({
        id:
          typeof crypto !== 'undefined' &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,

        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        course: formData.course.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),

        lat: location.lat,
        lng: location.lng,

        resolvedAddress: location.displayName,
      })

      setFormData(initialForm)
      setErrors({})
    } catch (error) {
      setSubmitError(
        error.message ||
          'Unable to register the student.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="h-100 border border-slate-200 shadow-sm rounded-4 overflow-hidden bg-white">

      <Card.Body className="p-0">

        <div className="border-bottom border-slate-200 p-4 bg-white">

          <div>
            <div
              className="small fw-bold text-dark text-uppercase mb-1"
              style={{ letterSpacing: '.08em' }}
            >
              New Record
            </div>

            <h2 className="h4 fw-bold text-slate-950 mb-1">
              Register a student
            </h2>

            <p className="small text-slate-500 mb-0">
              Complete all fields to create a map marker.
            </p>
          </div>

        </div>

        <div className="p-4">

          {submitError && (
            <Alert
              variant="danger"
              className="rounded-3 border-0 small"
            >
              <strong>
                Location not found.
              </strong>{' '}
              {submitError}
            </Alert>
          )}

          <Form
            noValidate
            onSubmit={handleSubmit}
          >

            <div className="d-flex align-items-center gap-2 mb-3">

              <span
                className="d-flex align-items-center justify-content-center rounded-circle bg-slate-950 text-white small fw-bold"
                style={{
                  width: 24,
                  height: 24,
                }}
              >
                1
              </span>

              <span className="small fw-bold text-slate-700">
                Personal information
              </span>

              <div className="flex-grow-1 border-top border-slate-200" />

            </div>

            <Row className="g-3">

              <Col md={6}>

                <Form.Group controlId="firstname">

                  <FieldLabel>
                    Firstname
                  </FieldLabel>

                  <Form.Control
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.firstname)}
                    placeholder="Juan"
                    autoComplete="given-name"
                    className="rounded-3 py-2 px-3 border-slate-200 shadow-none"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.firstname}
                  </Form.Control.Feedback>

                </Form.Group>

              </Col>

              <Col md={6}>

                <Form.Group controlId="lastname">

                  <FieldLabel>
                    Lastname
                  </FieldLabel>

                  <Form.Control
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.lastname)}
                    placeholder="Dela Cruz"
                    autoComplete="family-name"
                    className="rounded-3 py-2 px-3 border-slate-200 shadow-none"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.lastname}
                  </Form.Control.Feedback>

                </Form.Group>

              </Col>

              <Col xs={12}>

                <Form.Group controlId="course">

                  <FieldLabel>
                    Course
                  </FieldLabel>

                  <Form.Control
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.course)}
                    placeholder="e.g. BS Information Technology"
                    className="rounded-3 py-2 px-3 border-slate-200 shadow-none"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.course}
                  </Form.Control.Feedback>

                </Form.Group>

              </Col>

              <Col xs={12}>

                <Form.Group controlId="email">

                  <FieldLabel>
                    Email address
                  </FieldLabel>

                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.email)}
                    placeholder="student@example.com"
                    autoComplete="email"
                    className="rounded-3 py-2 px-3 border-slate-200 shadow-none"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>

                </Form.Group>

              </Col>

            </Row>

            <div className="d-flex align-items-center gap-2 mt-4 mb-3">

              <span
                className="d-flex align-items-center justify-content-center rounded-circle bg-slate-950 text-white small fw-bold"
                style={{
                  width: 24,
                  height: 24,
                }}
              >
                2
              </span>

              <span className="small fw-bold text-slate-700">
                Location information
              </span>

              <div className="flex-grow-1 border-top border-slate-200" />

            </div>

            <Form.Group controlId="address">

              <FieldLabel>
                Address
              </FieldLabel>

              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={Boolean(errors.address)}
                placeholder="e.g. SM Mall of Asia, Pasay City, Philippines"
                autoComplete="street-address"
                className="rounded-3 px-3 py-2 border-slate-200 shadow-none"
              />

              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>

            </Form.Group>

            <div className="rounded-3 bg-slate-50 border border-slate-200 p-3 mt-3">

              <p className="small text-slate-500 mb-0">
                Use a complete searchable location.
                For testing, a public landmark is recommended
                instead of a private home address.
              </p>

            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="dark"
              className="w-100 rounded-3 py-3 fw-bold mt-4 shadow-sm"
            >

              {isSubmitting ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />

                  Locating address...
                </>
              ) : (
                'Register & locate student'
              )}

            </Button>

          </Form>

        </div>

      </Card.Body>

    </Card>
  )
}