 
import React from "react";
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import * as Yup from "yup"
import { useTranslation } from 'react-i18next'
 

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function signup(name: string, email: string, password: string) {
    try {
      await axios.post('https://server-to-do-lake.vercel.app/api/users/register', {
        name,
        email,
        password
      })
      toast.success(t('success'))
      setTimeout(() => navigate('/signin'), 1000)
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(6, t('nameMin')).max(15, t('nameMax')).required(t('nameRequired')),
      email: Yup.string().email(t('emailValid')).required(t('emailRequired')),
      password: Yup.string().min(6, t('passwordMin')).required(t('passwordRequired')),
      rePassword: Yup.string().oneOf([Yup.ref('password')], t('passwordMatch')).required(t('rePasswordRequired')),
    }),
    onSubmit: (values) => signup(values.name, values.email, values.password),
  });
 
  return (
    <div className="container relative mt-4" >
      <div className='w-full md:w-2/3 mx-auto'>
        <h2 className='text-2xl'>{t('register')}</h2>

        <form className="w-full mx-auto mt-2 shadow bg-white p-6 rounded-2xl" onSubmit={formik.handleSubmit}>
          {/* Input Name */}
          <div className="relative z-0 w-full mb-3 group">
            <input
             onBlur={formik.handleBlur}
              onChange={formik.handleChange}
               value={formik.values.name}
                type="text" name="name" 
                id="floating_name"
                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-sky-600 peer" placeholder=" " />
            <label htmlFor="floating_name"
             className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {t('name')}:</label>
          </div>
          {formik.touched.name && formik.errors.name && <div className="error-style">{formik.errors.name}</div>}

          {/* Input Email */}
          <div className="relative z-0 w-full mb-3 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="floating_email"
             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-sky-600 peer" placeholder=" " />
            <label htmlFor="floating_email"
             className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{t('email')}:</label>
          </div>
          {formik.touched.email && formik.errors.email && <div className="error-style">{formik.errors.email}</div>}

          {/* Input Password */}
          <div className="relative z-0 w-full mb-3 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="floating_password" 
             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-sky-600 peer" placeholder=" " />
            <label htmlFor="floating_password"
             className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{t('password')}:</label>
          </div>
          {formik.touched.password && formik.errors.password && <div className="error-style">{formik.errors.password}</div>}

          {/* Input Re-Password */}
          <div className="relative z-0 w-full mb-3 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="floating_rePassword" 
             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-sky-600 peer" placeholder=" " />
            <label htmlFor="floating_rePassword" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{t('rePassword')}:</label>
          </div>
          {formik.touched.rePassword && formik.errors.rePassword && <div className="error-style">{formik.errors.rePassword}</div>}

           
      <div className="flex-col md:flex-row flex items-start justify-between gap-y-3">
         <button
    type="submit"
    className="!underline text-white  bg-sky-400 hover:bg-sky-500 px-8   cursor-pointer font-medium rounded-lg w-full md:w-auto block py-2.5 text-center md:me-auto"
  >
    {t('register')}
  </button>
  <Link
    to={'/signin'}
    className=" !text-sky-400  cursor-pointer font-medium rounded-lg text-sm w-full md:w-auto block px-8  py-2.5 text-center md:ms-auto"
  >
    {t('signin')}
  </Link>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
