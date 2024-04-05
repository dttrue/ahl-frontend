import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuildingMap from './BuildingMap';

const HousingDetails = () => {
    const [projectData, setProjectData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchCriteria, setSearchCriteria] = useState({
        borough: '',
        bedrooms: ''
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;// Adjust based on your UI and performance needs
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [responseOne, responseTwo] = await Promise.all([
                    axios.get('http://localhost:1117/api/housing'),
                    axios.get("http://localhost:1117/api/housing2")
                ]);

                const data = [...responseOne.data, ...responseTwo.data];
                setProjectData(data);
                setFilteredData(data);
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const filterData = () => {
        const { borough, bedrooms } = searchCriteria;
        const filtered = projectData.filter(project => {
            return (borough ? project.borough === borough : true) &&
                   (bedrooms ? project[`_${bedrooms}_br_units`] > 0 : true);
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    // Calculate items for current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="search-criteria">
                {/* Search inputs */}
                <input
                    type="text"
                    placeholder="Borough"
                    name="borough"
                    value={searchCriteria.borough}
                    onChange={handleSearchChange}
                />
                <input
                    type="number"
                    placeholder="Bedrooms (1, 2, 3...)"
                    name="bedrooms"
                    value={searchCriteria.bedrooms}
                    onChange={handleSearchChange}
                />
                <button onClick={filterData}>Search</button>
            </div>
            <div className="housing-projects">
                <h1>Housing List</h1>
                {currentItems.map((project, index) => (
                    <div key={project.id || index} className="housing-project">
                        {/* Building details */}
                        <div className="card mb-3" style={{ maxWidth: '400px', margin: '15px auto' }}>
                            <div className="card-body">
                                {/* Project details */}
                                <h5 className="card-title">{project.project_name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{project.borough}</h6>
                                <h6>Extremely Low Income Units: {project.extremely_low_income_units}</h6>
                      <h6>Very Low Income Units: {project.very_low_income_units}</h6>
                      <h6>Low Income Units: {project.low_income_units}</h6>
    
     <h6>Studio Units: {project.studio_units}</h6>
                      <h6>1 Bedroom Units: {project._1_br_units}</h6>
                      <h6>2 Bedroom Units: {project._2_br_units}</h6>
                      <h6>3 Bedroom Units: {project._3_br_units}</h6>
                    
                      <h6>Counted_rental_units: {project.counted_rental_units}</h6>
                                
                            </div>
                        </div>
                        <BuildingMap building={project} apikey={apikey} />
                    </div>
                ))}
            </div>
            <div className="pagination-controls">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default HousingDetails;





