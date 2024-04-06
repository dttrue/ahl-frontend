import { useState } from "react";
import axios from "axios";

const HousingApplicationForm = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    age: "",
    email: "",
    phone: ""
  });

  const [incomeDetails, setIncomeDetails] = useState({
    annualIncome: "",
    sourceOfIncome: ""
   
  });

  const [housingPreferences, setHousingPreferences] = useState({
    preferredLocation: "",
    numberOfBedrooms: ""
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleIncomeDetailsChange = (e) => {
    setIncomeDetails({
      ...incomeDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleHousingPreferencesChange = (e) => {
    setHousingPreferences({
      ...housingPreferences,
      [e.target.name]: e.target.value,
    });
  };

  // Submit data to endpoint

  const submitFormData = async (e) => {
    e.preventDefault();
    console.log(personalInfo);
    console.log(incomeDetails);
    console.log(housingPreferences);

    try {
        // Submit Personal Info
        const personalInfoResponse = await axios.post("http://localhost:1117/api/personalInfo", personalInfo);
        console.log("Personal Info Success:", personalInfoResponse.data);
      
        // Submit Income Details
        const incomeDetailsResponse = await axios.post("http://localhost:1117/api/incomeDetails", incomeDetails);
        console.log("Income Details Success:", incomeDetailsResponse.data);
      
        // Submit Housing Preferences
        const housingPreferencesResponse = await axios.post("http://localhost:1117/api/housingPreferences", housingPreferences);
        console.log("Housing Preferences Success:", housingPreferencesResponse.data);
      
        console.log("All forms submitted successfully");
    } catch (error) {
        console.error("Failed to submit form:", error.response ? error.response.data : error.message);
    }


  

    // Reset form fields

    setPersonalInfo({
      name: "",
      age: "",
      email: "",
      phone: ""
    });

    setIncomeDetails({
      annualIncome: "",
      sourceOfIncome: ""
      
    });

    setHousingPreferences({
      preferredLocation: "",
      numberOfBedrooms: ""
    });
  };

  return (
    <div class="container mt-5">
    <h1 class="text-center">Housing Application Form</h1>
    <form onSubmit={submitFormData}>
        <div class="d-flex justify-content-center mb-3">
            <div class="form-group w-50">
                <input type="text" className="form-control" id="nameInput" name="name" placeholder="Name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
            </div>
        </div>
        
        <div class="d-flex justify-content-center mb-3">
            <div class="form-group w-50">
                <input type="text" className="form-control" id="ageInput" name="age" placeholder="Age" value={personalInfo.age} onChange={handlePersonalInfoChange} />
            </div>
        </div>
        
        <div class="d-flex justify-content-center mb-3">
            <div class="form-group w-50">
                <input type="text" className="form-control" id="emailInput" name="email" placeholder="Email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
            </div>
        </div>
        
        <div class="d-flex justify-content-center mb-3">
            <div class="form-group w-50">
                <input type="text" className="form-control" id="phoneInput" name="phone" placeholder="Phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
            </div>
        </div>
        
        <div class="d-flex justify-content-center mb-3">
            <div className="form-group w-50">
                <input type="text" class="form-control" id="annualIncomeInput" name="annualIncome" placeholder="Annual Income" value={incomeDetails.annualIncome} onChange={handleIncomeDetailsChange} />
            </div>
        </div>
        
        <div class="d-flex justify-content-center mb-3">
            <div class="form-group w-50">
                <input type="text" className="form-control" id="sourceOfIncomeInput" name="sourceOfIncome" placeholder="Source of Income" value={incomeDetails.sourceOfIncome} onChange={handleIncomeDetailsChange} />
            </div>
        </div>
        
        <div class="d-flex justify-content-center mb-3">
            <div class="form-group w-50">
                <select className="form-control" id="numberOfBedroomsInput" name="numberOfBedrooms" placeholder="Number of Bedrooms" value={housingPreferences.numberOfBedrooms} onChange={handleHousingPreferencesChange} >
                  <option value="">Select Preferred Location</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="Queens">Queens</option>
                  <option value="Staten Island">Staten Island</option>
                  <option value="Bronx">Bronx</option>
                </select>
            </div>
        </div>
        
        <div class="d-flex justify-content-center mb-3">
            <div class="form-group w-50">
                <input type="text" className="form-control" id="numberOfBedroomsInput" name="numberOfBedrooms" placeholder="Number of Bedrooms" value={housingPreferences.numberOfBedrooms} onChange={handleHousingPreferencesChange} />
            </div>
        </div>
        
        <div class="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>
</div>





        
  )
};
export default HousingApplicationForm;
