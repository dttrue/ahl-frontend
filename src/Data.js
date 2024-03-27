const apiUrl1 = "https://data.cityofnewyork.us/resource/hg8x-zxpr.json"; //api for affordablle buildings
const apiUrl2 = "https://data.cityofnewyork.us/resource/9ay9-xkek.json"; //api for other info


async function fetchData(url){
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
  return response.json()
}

async function fetchAndMergeData(apiUrl1, apiUrl2){
  try {
    const data1 = await fetchData(apiUrl1);
    const data2 = await fetchData(apiUrl2);

    return mergeDataOnProjectID(data1, data2);
  } catch (error) {
    console.error("Failed to fetch or merge data:", error);
  }
}


function mergeDataOnProjectID(dataSet1, dataSet2) {

  const mergedData = [];
  
  const dataSet2Map = new Map(dataSet2.map((item) => [item.projectId, item]));

  dataSet1.forEach((item1) => {
    const item2 = dataSet2Map.get(item1.projectId);
    if (item2) {
      
      mergedData.push({ ...item1, ...item2 });
    } else {
      mergedData.push(item1);
    }
  });

 return mergedData
}

fetchAndMergeData(apiUrl1, apiUrl2)
.then(mergedData => {
  console.log('Merged Data:', mergedData);
})
.catch(error => {
  console.error("Error processing merged data:", error)
})

 export default fetchAndMergeData;