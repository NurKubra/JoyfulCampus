import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import ButtonSpinner from "../../common/button-spinner";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { refreshToken, setOperation } from "../../../store/slices/misc-slice";
import { swalAlert } from "../../../helpers/swal";
import * as Yup from "yup";
import { MultiSelect } from "primereact/multiselect";
import { createMeet } from "../../../api/meet-service";
import { getAllStudentsForAdvisor } from "../../../api/student-service";

const NewMeetForm = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  const initialValues = {
    date: "",
    description: "",
    startTime: "",
    stopTime: "",
    studentIds: [],
  };

  const validationSchema = Yup.object({
    date: Yup.date().required("Required"),
    startTime: Yup.string().required("Required"),
    stopTime: Yup.string().required("Required"),
    studentIds: Yup.array().min(1, "Required"),
    description: Yup.string()
      .required("Required")
      .min(2, "At least 2 characters")
      .max(16, "Max 16 characters"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createMeet(values);
      formik.resetForm();
      dispatch(refreshToken()); // Listeyi güncellemek için
      dispatch(setOperation(null)); // New formunu kapatmak için
      swalAlert("Meet was created", "success");
    } catch (err) {
      const msg = Object.values(err.response.data.validations)[0];
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setOperation(null));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loadStudents = async () => { //backendeki veriden sadce ogrencinin adi ve soyadini alip student icine attik--> sonra asagida multiselct icine attik 
    try {
      const data = await getAllStudentsForAdvisor();

      const arr = data.map((item) => ({
        id: item.userId,
        label: `${item.name} ${item.surname}`,
      }));
      setStudents(arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="g-3">
              <Col xs={12}>
                <MultiSelect
                  value={formik.values.studentIds} //students larin iciden secili olanlri gosteriyoruz 
                  onChange={(e) => formik.setFieldValue("studentIds", e.value)}
                  options={students}
                  optionValue="id"
                  optionLabel="label"
                />
              </Col>

              <Col md={4}>
                <FloatingLabel controlId="date" label="Date" className="mb-3">
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("date")}
                    isInvalid={formik.touched.date && formik.errors.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.date}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="startTime"
                  label="Start Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("startTime")}
                    isInvalid={
                      formik.touched.startTime && formik.errors.startTime
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.startTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col md={4}>
                <FloatingLabel
                  controlId="stopTime"
                  label="End Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("stopTime")}
                    isInvalid={
                      formik.touched.stopTime && formik.errors.stopTime
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.stopTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={12}>
                <FloatingLabel
                  controlId="description"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("description")}
                    isInvalid={
                      formik.touched.description && formik.errors.description
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button
                  variant="outline-secondary"
                  className="me-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonSpinner />} Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewMeetForm;