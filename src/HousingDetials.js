import { useState, useEffect } from 'react';
import axios from 'axios';

function HousingProject() {
    // State for storing the list of projects
    const [projectData, setProjectData] = useState([]);
    // State to track the loading status
    const [loading, setLoading] = useState(true);
    // State to store any error messages
    const [error, setError] = useState('');

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // Define an asynchronous function to fetch data
        const fetchData = async () => {
            try {
                setLoading(true); // Begin loading
                // Fetch data from two endpoints in parallel
                const [responseOne, responseTwo] = await Promise.all([
                    axios.get('http://localhost:1117/api/housing'),
                    axios.get("http://localhost:1117/api/housing2")
                ]);
              
                // Combine the data from both responses
                const combinedData = [...responseOne.data, ...responseTwo.data];
                // Remove duplicates based on project_name
                const uniqueData = combinedData.reduce((acc, current) => {
                    const x = acc.find(item => item.project_name === current.project_name); 
                    if (!x) { // If the project isn't already in acc, add it
                        return acc.concat([current]);
                    } else { // Otherwise, just return acc unchanged
                        return acc;
                    }
                }, []);
                setProjectData(uniqueData); // Update state with the unique projects
            } catch (error) {
                console.error('Failed to fetch housing data:', error);
                setError('Failed to fetch housing data'); // Set error message
            } finally {
                setLoading(false); // End loading regardless of success or failure
            }
        };

        fetchData(); // Call fetchData to execute the fetching
    }, []); // Empty dependency array means this effect runs once on mount


    if (loading) return <div>Loading...</div>; // Display loading message while fetching
    if (error) return <div>{error}</div>; // Display error message if any error occurred

    // Render the list of projects as cards
    return (
        <div className="housing-projects">
            <h1>
                Housing List
            </h1>
        {projectData.map((project, index) => (
            <div key={project.id || index} className="card mb-3" style={{ maxWidth: '400px', margin: '15px auto'  }}> 
                <div className="card-body">
                    <h5 className="card-title">{project.project_name}</h5>
                    <ul className="list-group list-group-flush">
                    <li className='list-group-item'>House Number: {project.house_number}</li>  
                    <li className='list-group-item'>Street Name: {project.street_name}</li>
                    <li className='list-group-item'>Borough: {project.borough}</li>
                    <li className='list-group-item'>Postcode: {project.postcode}</li>             
                      <li className='list-group-item'>Extremely Low Income Units: {project.extremely_low_income_units}</li>
                      <li className='list-group-item'>Very Low Income Units: {project.very_low_income_units}</li>
                      <li className='list-group-item'>Low Income Units: {project.low_income_units}</li>
                      <li className='list-group-item'>Moderate Income Units: {project.moderate_income_units}</li>
                      <li className='list-group-item'>Middle Income Units: {project.middle_income_units}</li>
                      <li className='list-group-item'>Other Income Units: {project.other_income_units}</li>
                      <li className='list-group-item'>Studio Units: {project.studio_units}</li>
                      <li className='list-group-item'>1 Bedroom Units: {project._1_br_units}</li>
                      <li className='list-group-item'>2 Bedroom Units: {project._2_br_units}</li>
                      <li className='list-group-item'>3 Bedroom Units: {project._3_br_units}</li>
                      <li className='list-group-item'>4 Bedroom Units: {project._4_br_units}</li>
                      <li className='list-group-item'>5 Bedroom Units: {project._5_br_units}</li>
                      <li className='list-group-item'>6 Bedroom Units: {project._6_br_units}</li>
                      <li className='list-group-item'>Counted rental units: {project.counted_rental_units}</li>
                      <li className='list-group-item'>Rent: {project.lowactualrent ? `$${project.lowactualrent}` : 'N/A' }</li>

                    </ul>
                </div>
            </div>
        ))}
    </div>
    
    );
}

export default HousingProject;


