import { useState, useEffect } from 'react';
import axios from 'axios';

function HousingProject() {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [responseOne, responseTwo] = await Promise.all([
                    axios.get('http://localhost:1117/api/housing'),
                    axios.get("http://localhost:1117/api/housing2")
                ]);
              
                const combinedData = [...responseOne.data, ...responseTwo.data];
                const uniqueData = combinedData.reduce((acc, current) => {
                    const x = acc.find(item => item.project_name === current.project_name); 
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                setProjectData(uniqueData);
            } catch (error) {
                console.error('Failed to fetch housing data:', error);
                setError('Failed to fetch housing data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                      <li className='list-group-item'>Studio Units: {project.studio_units}</li>
                      <li className='list-group-item'>1 Bedroom Units: {project._1_br_units}</li>
                      <li className='list-group-item'>2 Bedroom Units: {project._2_br_units}</li>
                      <li className='list-group-item'>3 Bedroom Units: {project._3_br_units}</li>
                      <li className='list-group-item'>Counted Rental Units: {project.counted_rental_units}</li>
                      <li className='list-group-item'>Total Units: {project.total_units}</li>

                    </ul>
                </div>
            </div>
        ))}
    </div>
    
    );
}

export default HousingProject;


