import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

export const submitData = apiUrl + '/api/InsertFranchisee';
export const getAllCountry = apiUrl + '/getapi/GetAllCountryCodes';
export const getALLStates = apiUrl + '/api/GetAllStates?CountryId=';
export const getAllCities = apiUrl + '/api/GetAllCitiesByStateName';
