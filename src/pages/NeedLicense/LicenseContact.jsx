import  { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
//  type: Yup.string().required("Type is required"),
  message: Yup.string().required("Message is required"),
});

export default function LicenseContact() {
  const [type, setType] = useState("");
  const [searchParams] = useSearchParams();
  const formikRef = useRef(null);

  useEffect(() => {
    const t = searchParams.get("type");
    setType(t || "");
    if (formikRef.current) {
      formikRef.current.setFieldValue("type", t);
    }
  }, []);

  const initialValues = {
    name: "",
    email: "",
    type: "",
    message: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (!values.type) {
        values.type = type
      }
      const { data } = await api.post("contact_us", values);
      if (data.status) {
        toast.success(data.msg);
        resetForm();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="bg-white shadow-lg px-4 py-4 rounded-lg contact-licence max-w-2xl mx-auto">
        <h2 className="text-center mb-6 text-2xl font-semibold">Contact Us</h2>

        <Formik
          initialValues={initialValues}

          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="w-full border rounded-md p-2 border-[#ABCEFA] h-12"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full border rounded-md p-2 border-[#ABCEFA] h-12"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Type</label>
                <Field
                  as="select"
                  name="type"
                  value={
                    type
                  }
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    setType(e.target.value);
                  }}
                  className="w-full border rounded-md p-2 border-[#ABCEFA] h-12 focus:outline-0"
                >
                  <option value="">Select Type</option>
                  <option value="hospital">For Hospitals & Facilities</option>
                  <option value="individual">For Individuals & Families</option>
                  <option value="already">Already Purchased?</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Enter Your Message"
                  className="w-full border rounded-md p-2 border-[#ABCEFA] h-24"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="text-center">
                <button
                  className="bg-[#008CFF] text-white py-3 px-8 rounded-lg text-lg mt-4 mb-4"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
