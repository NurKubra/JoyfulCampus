import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import ButtonSpinner from "../common/button-spinner";
import PasswordInput from "../common/password-input";
import { login } from "../../api/auth-service";
import { setLocalStorage } from "../../helpers/encrypted-storage";
import { useDispatch } from "react-redux";
import { login as loginSuccess } from "../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { swalAlert } from "../../helpers/swal";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const initialValues = {
    username: "roo",
    password: "123456Aa.",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

   //login service(backende baglanan auth service)
   //token al
   //local storage a yerlestir
   //merkezi state i guncelle
   //navigate (login olmus kullanici islemi) */
   /* api login olmus kullaniciya bir token verir --> her seferinde kullnican kullanici adi ve sifre istemek icin --> bu bir kimlik numarasi gibi her seferinde bu numarayi kullanarak  */
  const onSubmit = async (values) => {
    setLoading(true);

    try {

        const user = await login(values); //1
        const {token} = user;   //user icinden tokeni aldik 
        //localStorage("token", token); --> normalde bu sekilde yapsaydik consolda (application da) tokeni acikca gosteriyor ama bunu istemiyoruz 
        setLocalStorage("token", token);    //tokeni aciktan elde etmemk icin encryt storeg adinda bir kutuphane kullanidk --> bu kutuphane ile tokuenimizi sifreliyoruz --> local storege e sifreleyip atiyor --> geri verirken de sifreyi cozup veriyor --> 
        dispatch(loginSuccess(user))
        navigate("/dashboard")
        
    } catch (err) {
        const errMsg = err.response.data.message;
        swalAlert(errMsg, "error");
    }
    finally{
        setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0 border-top border-5 border-primary">
            <Card.Body>
              <div className="mb-4 mt-4 text-muted fst-italic">
                Please enter your username and password!
              </div>

              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <PasswordInput
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                    error={formik.errors.password}
                  />

                </Form.Group>

                <Button
                  className="w-100"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonSpinner />} Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm




//formik --> backende gitmeden validation yapmayi saglar.
//formik --> 3 deger alir --> baslangic degerleri(initialValues)-->(backendin bekledigi isimleri yazmak mantikli)
//backende gitmeden degerleri valide eder--> backend zaten bu kontrolleri yapcak ama backedni yormadan hemen onden kontrol ediyoruz
//noValidate ile defaultta bulunan validationi devre disi biraktik; formik.handleSubmit ile de kendi validation islemlerimizi  
//                {...formik.getFieldProps("username") --> username isimli field icin formik ile ilgili alanlari olusturur ?
/*
disabled={!formik.isValid} sadece boyle yazsaydik formun hic dokunulmamis ilk halini valid olarak kabul ederdi bu yuzden forma
dokunulup dokunalumdigina gore karar vermesini sagladik.

 {loading && <ButtonSpinner/>} --> backenden veri akisi oldugu sirada yani loading sirasinda 
*/
