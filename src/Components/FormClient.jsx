import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const FormService = () => {
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    select: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.input1) {
      newErrors.input1 = "El nombre es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.input1)) {
      newErrors.input1 = "El nombre solo puede contener letras.";
    }
    if (!formData.input2) {
      newErrors.input2 = "El correo electrónico es obligatorio.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.input2)) {
      newErrors.input2 = "Debe ser un correo electrónico válido.";
    }
    if (!formData.input3) {
      newErrors.input3 = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(formData.input3)) {
      newErrors.input3 = "El teléfono solo puede contener números.";
    }
    if (!formData.select) {
      newErrors.select = "Debe seleccionar una opción.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const refForm = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(refForm.current);
    const serviceId = "service_e46mezl";
    const templateId = "template_p61qp9f";
    const publicKey = "OZ3hx585btyjsk5Bq";
    emailjs
      .sendForm(serviceId, templateId, refForm.current, publicKey)
      .then((result) => console.log("mensaje enviado", result.text))
      .catch((err) => console.error(err));

    if (validateForm()) {
      setFormSubmitted(true);
      console.log("mensaje enviado", formData);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      setFormData({
        input1: "",
        input2: "",
        input3: "",
        select: "",
      });
    }
  };

  return (
    <div className="bg-gray-500 bg-opacity-20 rounded-lg p-8">
      <div className="bg-black bg-opacity-75 rounded-lg p-6 w-full max-w-md">
        <form
          ref={refForm}
          action=""
          onSubmit={handleSubmit}
          className="text-center max-w-md mx-auto p-4 bg-transparent rounded-md"
        >
          <p className="text-[#0EFF06] text-xl">Contactanos</p>
          <fieldset className="mb-4">
            <label htmlFor="input1" className="block text-white font-bold mb-2">
              <br />
            </label>
            <input
              type="text"
              id="input1"
              name="input1"
              value={formData.input1}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-l w-full mr-1 focus:outline-none"
              placeholder="Nombre"
            />
            {errors.input1 && (
              <p className="text-red-500 text-sm mt-1">{errors.input1}</p>
            )}
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="input2" className="block text-white font-bold mb-2">
              <br />
            </label>
            <input
              type="text"
              id="input2"
              name="input2"
              value={formData.input2}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-l w-full mr-1 focus:outline-none"
              placeholder="E-mail"
            />
            {errors.input2 && (
              <p className="text-red-500 text-sm mt-1">{errors.input2}</p>
            )}
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="input3" className="block text-white font-bold mb-2">
              <br />
            </label>
            <input
              type="text"
              id="input3"
              name="input3"
              value={formData.input3}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-l w-full mr-1 focus:outline-none"
              placeholder="Telefono"
            />
            {errors.input3 && (
              <p className="text-red-500 text-sm mt-1">{errors.input3}</p>
            )}
          </fieldset>
          <fieldset className="mb-4">
            <label
              htmlFor="select"
              className="block text-center text-white font-bold mb-2"
            >
              <br />
            </label>
            <select
              id="select"
              name="select"
              value={formData.select}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-l w-full mr-1 focus:outline-none"
            >
              <option value="">Seleccione una opción</option>
              <option value="Problemas con mi pago">
                Problemas con mi pago
              </option>
              <option value="No me llego mi pedido">
                No me llego mi pedido
              </option>
              <option value="Problemas con mi instalación">
                Problemas con mi instalación
              </option>
              <option value="Problemas con el envío">
                Problemas con el envío
              </option>
            </select>
            {errors.select && (
              <p className="text-red-500 text-sm mt-1">{errors.select}</p>
            )}
          </fieldset>
          <button
            type="submit"
            className="bg-[#0EFF06] text-black py-2 px-4 rounded-full h-10 w-40 hover:bg-[#41CC03] transition-colors duration-300"
          >
            Enviar
          </button>
        </form>
        {formSubmitted && (
          <p className="text-[#0EFF06] text-center mt-4">
            Su mensaje ha sido enviado.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormService;
