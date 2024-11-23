import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebaseConfig"; // Import Firestore and Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Report: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    state: "",
    district: "",
    taluk: "",
    municipal: "",
    pincode: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const uploadedFilesUrls: string[] = [];

      // Upload files to Firebase Storage
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const storageRef = ref(storage, `proofs/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          uploadedFilesUrls.push(downloadURL);
        }
      }

      // Save data to Firestore
      await addDoc(collection(db, "grievances"), {
        ...formData,
        files: uploadedFilesUrls,
        timestamp: new Date(),
      });

      alert("Grievance submitted successfully!");
      navigate("/track");
    } catch (err) {
      console.error("Error submitting grievance:", err);
      setError("Failed to submit the grievance. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 flex flex-col min-h-screen w-screen overflow-hidden">
      <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center sticky top-0 z-50 w-full">
        <div className="flex items-center space-x-8">
          <a href="/" onClick={() => navigate("/homeIn")} className="text-gray-300 hover:text-blue-400">
            Home
          </a>
          <a href="/report" className="text-gray-300 hover:text-blue-400">
            Report
          </a>
        </div>
      </nav>

      <header className="text-center py-8 bg-gray-900 w-full">
        <h1 className="text-4xl font-bold text-blue-400">Grievance Redressal Platform</h1>
      </header>

      <section className="flex-grow container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-400 mb-8">Submit Your Grievance</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
          <div>
            <label htmlFor="description" className="block text-left text-gray-200">
              Problem Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              placeholder="Describe the issue..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label htmlFor="proof" className="block text-left text-gray-200">
              Upload Proof:
            </label>
            <input type="file" id="proof" multiple onChange={handleFileChange} className="block w-full text-gray-200" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-300">Location Details</h3>
            <label htmlFor="state" className="block text-left text-gray-200">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter State"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.state}
              onChange={handleChange}
            />
            <label htmlFor="district" className="block text-left text-gray-200">
              District:
            </label>
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Enter District"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.district}
              onChange={handleChange}
            />
            <label htmlFor="taluk" className="block text-left text-gray-200">
              Taluk:
            </label>
            <input
              type="text"
              id="taluk"
              name="taluk"
              placeholder="Enter Taluk"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.taluk}
              onChange={handleChange}
            />
            <label htmlFor="municipal" className="block text-left text-gray-200">
              Panchayat/Municipal Corporation:
            </label>
            <input
              type="text"
              id="municipal"
              name="municipal"
              placeholder="Enter Panchayat or Municipal Corporation"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.municipal}
              onChange={handleChange}
            />
            <label htmlFor="pincode" className="block text-left text-gray-200">
              Pin Code:
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter Pin Code"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit Grievance
          </button>
        </form>
      </section>

      <footer className="text-center py-4 bg-gray-800 text-gray-400 w-full">
        &copy; 2024 Grievance Redressal Platform. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Report;
