import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';


export async function searchInstances(req, res) {
  let instances;
  const { studyInstanceUID, seriesInstanceUID, wadoURL } = req.body
  const dicomUrl = `${wadoURL}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/instances`;
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    const response = await axios.get(dicomUrl, axiosConfig);
    instances = response.data;
    res.status(200).send(instances);
  } catch (error) {
    console.error('Erro na requisição DICOM:', error);
    res.status(404).send(error);
  }
}



export async function searchSeriesMetadata(req, res) {
  let instances;
  const { studyInstanceUID, seriesInstanceUID, wadoURL } = req.body
  const dicomUrl = `${wadoURL}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/metadata`;
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    const response = await axios.get(dicomUrl, axiosConfig);
    instances = response.data;
    if (typeof(instances) === 'string'){
      const metadataRegex = extractDICOM(instances)
      return res.status(200).send(metadataRegex);
    }
    res.status(200).send(instances);
  } catch (error) {
    console.error('Erro na requisição DICOM:', error);
    res.status(404).send(error);
  }
}

function extractDICOM(dicomData) {
  const endIndex = dicomData.indexOf('"BulkDataURI":"')+14;
  const restOfString = dicomData.slice(endIndex, dicomData.length-1)
  const index = restOfString.indexOf(',');
  const bulkDataURI = restOfString.slice(0, index)
  if (endIndex !== -1) {
    const resultado = dicomData.slice(0, endIndex) + ` ${bulkDataURI}]`;
    return resultado;
  }

  return null;
}