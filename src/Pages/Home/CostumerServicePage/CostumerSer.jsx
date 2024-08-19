import FormService from "../../../Components/FormClient";
import { Navlink } from "../../../Components/Navbar_";
import { Footer } from "../../../Components/footer";
import imgFondo from "../../../../dist/assets/fondo_service.png";
import "../CostumerServicePage/styleCust.css";

function CostumerSer() {
  return (
    <>
      <div className="bg-black min-h-screen flex flex-col containerFather">
        <Navlink />
        <br />
        <div className="flex flex-1 flex-col lg:flex-row p-4 md:p-8 lg:p-16 xl:p-24 gap-4">
          <div className="flex-1 flex justify-center items-center">
            <img src={imgFondo} alt="Image" className="max-w-full h-auto" />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <FormService />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CostumerSer;
