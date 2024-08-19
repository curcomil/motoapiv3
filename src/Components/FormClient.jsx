import { useState } from "react";

const FormService = () => {
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    select: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="bg-gray-500 bg-opacity-20 rounded-lg p-8">
      <div className="bg-black bg-opacity-75 rounded-lg p-6 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="text-center max-w-md mx-auto p-4 bg-transparent rounded-md"
        >
          <p className="text-[#0eff06] text-xl">Contactanos</p>
          <div className="mb-4">
            <label htmlFor="input1" className="block text-white font-bold mb-2">
              {/* Input 1 */}
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
          </div>
          <div className="mb-4">
            <label htmlFor="input2" className="block text-white font-bold mb-2">
              {/* Input 2 */}
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
          </div>
          <div className="mb-4">
            <label htmlFor="input3" className="block text-white font-bold mb-2">
              {/* Input 3 */}
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
          </div>
          <div className="mb-4">
            <label
              htmlFor="select"
              className="block text-center text-white font-bold mb-2"
            >
              Seleccione una opción
            </label>
            <select
              id="select"
              name="select"
              value={formData.select}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-l w-full mr-1 focus:outline-none"
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Problemas con mi pago</option>
              <option value="opcion2">No me llego mi pedido</option>
              <option value="opcion3">Problemas con mi instalación</option>
              <option value="opcion4">Problemas con el envío</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#0eff06] text-black py-2 px-4 rounded-full h-10 w-40  hover:bg-[#41CC03] transition-colors duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormService;
