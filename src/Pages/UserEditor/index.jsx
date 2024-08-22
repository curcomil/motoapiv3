import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navlink } from "../../Components/Navbar_";
import { Footer } from "../../Components/footer";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://motocicle-mongoapi-production.up.railway.app/api/auth/profile",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setProfileData(response.data);
        setValue("nombre", response.data.nombre);
        setValue("apellido", response.data.apellido);
        setValue("nacionalidad", response.data.nacionalidad);
        setValue("celular", response.data.celular);
        setValue("cp", response.data.cp);
        setValue("ciudad", response.data.ciudad);
        setValue("calle", response.data.calle);
        setValue("delegacion", response.data.delegacion);
        setValue("referencias", response.data.referencias);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del perfil", error);
      });
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        "https://motocicle-mongoapi-production.up.railway.app/api/auth/update",
        data,
        {
          withCredentials: true,
        }
      );
      Swal.fire({
        title: "Perfil actualizado",
        text: "¡Tu perfil ha sido actualizado con éxito!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0eff06",
      });
      reset();
    } catch (error) {
      Swal.fire({
        title: "Perfil actualizado",
        text: "¡Tu perfil ha sido actualizado con éxito!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0eff06", // Cambia el color del botón
        background: "#D2E5B7 !important", // Cambia el fondo de la alerta
        color: "#fff !important", // Cambia el color del texto en la alerta
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to edit your profile.</div>;
  }

  return (
    <div>
      <Navlink />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black to-[#148710]">
        <div className="bg-gray-500 bg-opacity-20 rounded-lg p-8">
          <div className="bg-black bg-opacity-75 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-center text-[#0eff06] text-xl font-bold mb-4">
              Editar perfil
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 flex">
                <input
                  type="text"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                  placeholder={profileData?.nombre || "Nombre"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-1/2 mr-1 focus:outline-none"
                />
                <input
                  type="text"
                  {...register("apellido", {
                    required: "Los apellidos son obligatorios",
                  })}
                  placeholder={profileData?.apellido || "Apellido"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-1/2 ml-1 focus:outline-none"
                />
              </div>
              {errors.nombre && (
                <p className="text-red-500">{errors.nombre.message}</p>
              )}
              {errors.apellido && (
                <p className="text-red-500">{errors.apellido.message}</p>
              )}

              <div className="mb-4 flex">
                <input
                  type="text"
                  {...register("nacionalidad", {
                    required: "La nacionalidad es obligatoria",
                  })}
                  placeholder={profileData?.nacionalidad || "Nacionalidad"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-1/2 focus:outline-none"
                />
                <input
                  type="text"
                  {...register("celular", {
                    required: "El móvil es obligatorio",
                  })}
                  placeholder={profileData?.celular || "Móvil"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-full ml-1 focus:outline-none"
                />
              </div>
              {errors.nacionalidad && (
                <p className="text-red-500">{errors.nacionalidad.message}</p>
              )}
              {errors.celular && (
                <p className="text-red-500">{errors.celular.message}</p>
              )}

              <div className="mb-4 flex">
                <input
                  type="text"
                  {...register("cp", {
                    required: "El código postal es obligatorio",
                  })}
                  placeholder={profileData?.cp || "CP"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-1/3 mr-1 focus:outline-none"
                />
                <input
                  type="text"
                  {...register("calle", {
                    required: "La calle es obligatoria",
                  })}
                  placeholder={profileData?.calle || "Calle"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-2/3 ml-1 focus:outline-none"
                />
              </div>
              {errors.cp && <p className="text-red-500">{errors.cp.message}</p>}
              {errors.calle && (
                <p className="text-red-500">{errors.calle.message}</p>
              )}

              <div className="mb-4 flex flex-row">
                <input
                  type="text"
                  {...register("delegacion", {
                    required: "La delegación es obligatoria",
                  })}
                  placeholder={profileData?.delegacion || "Delegación"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-full focus:outline-none mx-1"
                />
                <input
                  type="text"
                  {...register("ciudad", {
                    required: "La ciudad es obligatoria",
                  })}
                  placeholder={profileData?.ciudad || "ciudad"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-full focus:outline-none mx-1"
                />
              </div>
              {errors.ciudad && (
                <p className="text-red-500">{errors.ciudad.message}</p>
              )}

              <div className="mb-4">
                <input
                  type="text"
                  {...register("referencias", {
                    required: "Las referencias son obligatorias",
                  })}
                  placeholder={profileData?.referencias || "Referencias"}
                  className="bg-gray-800 text-white p-2 rounded-sm w-full focus:outline-none"
                />
              </div>
              {errors.referencias && (
                <p className="text-red-500">{errors.referencias.message}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#0eff06] text-black p-2 rounded-sm hover:bg-green-600 focus:outline-none"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfileForm;
