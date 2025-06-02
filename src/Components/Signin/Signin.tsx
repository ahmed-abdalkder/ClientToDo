 import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/Auth/AuthContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const { t } = useTranslation();  
  const [rememberMe, setRememberMe] = useState(false);
  const { setUserName, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  type values = {
    email: string;
    password: string;
  };

  async function signin(values: values) {
    try {
      const { data } = await axios.post(
        "https://server-to-do-lake.vercel.app/api/users/login",
        values
      );

      if (rememberMe) {
        localStorage.setItem("tkn", data.token);
        localStorage.setItem("name", data.user.name);
      } else {
        sessionStorage.setItem("tkn", data.token);
        sessionStorage.setItem("name", data.user.name);
      }

      setToken(data.token);
      setUserName(data.user.name);

      toast.success(t("login_success"));
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err: unknown) {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const error = err as { response?: { data?: { msg?: string } } };
    toast.error(error.response?.data?.msg || "Error");
  } else {
    toast.error("Error");
  }
}

  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("email_invalid"))
        .required(t("email_required")),
      password: Yup.string()
        .min(6, t("password_min"))
        .required(t("password_required")),
    }),
    onSubmit: (values) => signin(values),
  });

  return (
    <div className="container relative mt-4">
      <div className="w-full md:w-2/3 mx-auto">
        <h2 className="text-2xl">{t("signin_title")}</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full mx-auto mt-2 shadow bg-white p-6 rounded-2xl"
        >
          {/* Email */}
          <div className="relative z-0 w-full mb-3 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-sky-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {t("email")}
            </label>
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="mb-5 text-sm text-red-800" role="alert">
              {formik.errors.email}
            </div>
          )}

          {/* Password */}
          <div className="relative z-0 w-full mb-3 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-sky-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {t("password")}
            </label>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="mb-5 text-sm text-red-800" role="alert">
              {formik.errors.password}
            </div>
          )}

          {/* Remember Me */}
          <div className="flex items-start mb-5">
            <input
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50"
            />
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              {t("remember_me")}
            </label>
          </div>

          {/* Submit */}
          <div className="flex-col md:flex-row flex items-start justify-between gap-y-3">
          
            <button
              type="submit"
              className="!underline text-white bg-sky-400 hover:bg-sky-500 px-8 cursor-pointer font-medium rounded-lg w-full md:w-auto block py-2.5 text-center md:me-auto"
            >
              {t("signin")}
            </button>
              <Link
              to="/"
              className="!text-sky-400  cursor-pointer font-medium rounded-lg text-sm w-full md:w-auto block px-8 py-2.5 text-center md:ms-auto"
            >
              {t("register")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
