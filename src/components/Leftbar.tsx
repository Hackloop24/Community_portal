import road from "../assets/road.jpeg";
import healthcare from "../assets/healthcare.png";
import safety from "../assets/safety.jpeg";
import utilities from "../assets/utilities.jpeg";
import education from "../assets/education.jpeg";
import environment from "../assets/environment.jpeg";
import corruption from "../assets/corruption.jpeg";

type MenuProp = {
  setMenu: any;
};

const Leftbar = (props: MenuProp) => {
  return (
    <div className="pl-20 pt-5 text-sm">
      {/* Road Complaints */}
      <div
        className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        onClick={() => props?.setMenu("road")}
      >
        <img src={road} className="w-5 h-5 rounded-sm" alt="Road Complaints" />
        <h1 className="ml-3 text-gray-700 font-medium">Road Complaints</h1>
      </div>

      {/* Healthcare Issues */}
      <div
        className="flex items-center mt-5 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        onClick={() => props?.setMenu("healthcare")}
      >
        <img
          src={healthcare}
          className="w-5 h-5 rounded-sm"
          alt="Healthcare Issues"
        />
        <h1 className="ml-3 text-gray-700 font-medium">Healthcare Issues</h1>
      </div>

      {/* Public Safety */}
      <div
        className="flex items-center mt-5 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        onClick={() => props?.setMenu("safety")}
      >
        <img src={safety} className="w-5 h-5 rounded-sm" alt="Public Safety" />
        <h1 className="ml-3 text-gray-700 font-medium">Public Safety</h1>
      </div>

      {/* Utilities and Infrastructure */}
      <div
        className="flex items-center mt-5 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        onClick={() => props?.setMenu("utilities")}
      >
        <img
          src={utilities}
          className="w-5 h-5 rounded-sm"
          alt="Utilities Issues"
        />
        <h1 className="ml-3 text-gray-700 font-medium">
          Utilities & Infrastructure
        </h1>
      </div>

      {/* Education Issues */}
      <div
        className="flex items-center mt-5 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        onClick={() => props?.setMenu("education")}
      >
        <img
          src={education}
          className="w-5 h-5 rounded-sm"
          alt="Education Issues"
        />
        <h1 className="ml-3 text-gray-700 font-medium">Education Issues</h1>
      </div>

      {/* Environmental Concerns */}
      <div
        className="flex items-center mt-5 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        onClick={() => props?.setMenu("environment")}
      >
        <img
          src={environment}
          className="w-5 h-5 rounded-sm"
          alt="Environmental Concerns"
        />
        <h1 className="ml-3 text-gray-700 font-medium">
          Environmental Concerns
        </h1>
      </div>

      {/* Corruption and Governance */}
      <div
        className="flex items-center mt-5 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        onClick={() => props?.setMenu("corruption")}
      >
        <img
          src={corruption}
          className="w-5 h-5 rounded-sm"
          alt="Corruption Issues"
        />
        <h1 className="ml-3 text-gray-700 font-medium">
          Corruption and Governance
        </h1>
      </div>

      {/* Divider */}
      <hr className="mt-6 border-gray-300" />

      {/* Footer Links */}
      <h1 className="mt-4 text-gray-500 text-xs">
        About · Careers · Contact Us
      </h1>
      <h1 className="text-gray-500 text-xs">Terms · Policies · Privacy</h1>
      <h1 className="text-gray-500 text-xs">Acceptable Use Policy</h1>
    </div>
  );
};

export default Leftbar;