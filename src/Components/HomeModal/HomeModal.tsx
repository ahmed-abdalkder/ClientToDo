//  import React from 'react';

// import { useFormik } from "formik"
// import { useState } from "react";
// import * as Yup from "yup";
// import { useTranslation } from 'react-i18next';

// const HomeModal = ({ handleAddTodo } : { handleAddTodo:(formData : FormData) => Promise<void> }) => {
//   const { t } = useTranslation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
    
//   const formik = useFormik({
//     initialValues:{
//       title:"",
//       image:null,
      
//     },

//     onSubmit:async({ title, image })=>{
//       const formData = new FormData();
//       formData.append("title", title);
//       if (image) {
//         formData.append("image", image);
//       }

//       await handleAddTodo(formData);
//       setIsModalOpen(false);
//       formik.resetForm(); 
//     },
//     validationSchema: Yup.object({
//       title: Yup.string()
//         .required(t('titleRequired')),
//       image: Yup.mixed()
//         .required(t('imageRequired')),
     
//     }),
//   });

//   return (
//    <div>
//   {/* open modal */}
//   <button
//     onClick={() => setIsModalOpen(true)}
//     className="w-full text-white bg-sky-400 hover:bg-sky-500 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center sm:w-auto"
//   >
//     <i className="fa-solid fa-plus"></i> {t('newTodo')}
//   </button>

//   {/* modal */}
//   {isModalOpen && (
//     <div
//       onClick={() => setIsModalOpen(false)}
//       className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center p-2"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="relative w-full max-w-md bg-white rounded-lg shadow-lg"
//       >
//         {/* header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <h3 className="text-base font-semibold text-gray-900">{t('newTodo')}</h3>
//           <button
//             onClick={() => setIsModalOpen(false)}
//             type="button"
//             className="text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
//           >
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//         </div>

//         {/* body */}
//         <form onSubmit={formik.handleSubmit} className="px-4 py-5">
//           <div className="grid gap-4">
//             {/* title */}
//             <div>
//               <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">
//                 {t('title')}
//               </label>
//               <input
//                 onChange={formik.handleChange}
//                 value={formik.values.title}
//                 type="text"
//                 name="title"
//                 id="title"
//                 className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-sky-400"
//                 placeholder={t('titlePlaceholder')}
//               />
//               {formik.touched.title && formik.errors.title && (
//                 <div className="mt-1 text-sm text-red-600">{formik.errors.title}</div>
//               )}
//             </div>

//             {/* image */}
//             <div>
//               <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-900">
//                 {t('uploadImage')}
//               </label>
//               <input
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.currentTarget.files?.[0];
//                   if (file) {
//                     formik.setFieldValue("image", file);
//                   }
//                 }}
//                 type="file"
//                 id="image"
//                 name="image"
//                 className="w-full file:bg-gray-700 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer text-sm border border-gray-300 rounded-lg bg-gray-50"
//               />
//               {formik.touched.image && formik.errors.image && (
//                 <div className="mt-1 text-sm text-red-600">{formik.errors.image}</div>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-5 text-white bg-sky-500 hover:bg-sky-400 font-medium rounded-lg text-sm px-5 py-2.5"
//           >
//             {t('addNewTodo')}
//           </button>
//         </form>
//       </div>
//     </div>
//   )}
// </div>

//   );
// };

// export default HomeModal;


import React from 'react';
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';

const HomeModal = ({ handleAddTodo }: { handleAddTodo: (formData: FormData) => Promise<void> }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
    },
    onSubmit: async ({ title, image }) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("title", title);
        if (image) {
          formData.append("image", image);
        }

        await handleAddTodo(formData);
        setIsModalOpen(false);
        formik.resetForm();
      } catch (error) {
        console.error('Error adding todo:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t('titleRequired') || 'Title is required'),
      image: Yup.mixed().required(t('imageRequired') || 'Image is required'),
    }),
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        formik.setFieldValue("image", file);
      }
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative z-50 w-full lg:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-200">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
        <span>{t('newTodo') || 'New Todo'}</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{t('newTodo') || 'Create New Todo'}</h3>
                <p className="text-sm text-slate-500 mt-1">Add a new task to your list</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                  {t('title') || 'Todo Title'}
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  type="text"
                  name="title"
                  id="title"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                    formik.touched.title && formik.errors.title
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-slate-200 focus:border-blue-500 bg-white'
                  }`}
                  placeholder={t('titlePlaceholder') || 'Enter your todo title...'}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formik.errors.title}
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-slate-700 mb-2">
                  {t('uploadImage') || 'Upload Image'}
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative w-full p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : formik.touched.image && formik.errors.image
                      ? 'border-red-300 bg-red-50'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <input
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        formik.setFieldValue("image", file);
                      }
                    }}
                    type="file"
                    id="image"
                    name="image"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="text-center">
                    {formik.values.image ? (
                      <div className="space-y-2">
                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-700">{(formik.values.image as File).name}</p>
                        <p className="text-xs text-slate-500">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-16 h-16 mx-auto bg-slate-200 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">Drop your image here</p>
                          <p className="text-xs text-slate-500">or click to browse</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {formik.touched.image && formik.errors.image && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formik.errors.image}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transform hover:-translate-y-0.5 disabled:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{t('addNewTodo') || 'Create Todo'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeModal;