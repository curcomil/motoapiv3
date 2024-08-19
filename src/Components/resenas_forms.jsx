import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

export const Resenasforms = ({ id, closeModal, setResponseMessage }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!data.rating) {
      data.rating = 5;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/products/${id}/reviews`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      reset();

      swal({
        title: "Comentario Agregado",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      swal({
        title: "Error al agregar el comentario",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <div className="border-2 border-[#0EFF06] rounded-lg p-3 bg-gray-800 text-lg max-w-lg mx-auto">
      <h2 className="text-xl text-center md:text-2xl">Nueva Reseña</h2>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="opinion" className="block text-sm md:text-base">
            Opinión:
          </label>
          <textarea
            className="textarea textarea-bordered w-full mt-1"
            placeholder="Escribe tu opinión aquí"
            id="opinion"
            {...register("opinion")}
            rows="4"
            cols="50"
          />
        </div>
        <br />

        <div>
          <label htmlFor="rating" className="block text-sm md:text-base">
            Calificación:
          </label>
          <div className="rating gap-1 mt-1 flex justify-center md:justify-start">
            <input
              type="radio"
              id="rating-1"
              value="1"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-2"
              value="2"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-3"
              value="3"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-4"
              value="4"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-5"
              value="5"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
              defaultChecked
            />
          </div>
        </div>
        <br />

        <button
          className="w-full bg-[#0EFF06] rounded-lg p-2 text-black font-bold text-xl hover:bg-white transition duration-300"
          type="submit"
        >
          Agregar comentario
        </button>
      </form>
    </div>
  );
};
