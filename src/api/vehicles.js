export async function getVehicles(page = 1) {
    try {
      const response = await fetch(`https://swapi.dev/api/vehicles/?page=${page}`);
      if (!response.ok) {
        return _handleError(response.status);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      _throwSpecificError(err);
    }
  }
  
  export async function getVehicle(id = 1) {
    try {
      const response = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
      if (!response.ok) {
        return _handleError(response.status);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      _throwSpecificError(err);
    }
  }
  
  export async function searchVehicle(name) {
    try {
      const response = await fetch(`https://swapi.dev/api/vehicles/?search=${name}`);
      if (!response.ok) {
        return _handleError(response.status);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      _throwSpecificError(err);
    }
  }
  
  function _handleError(status) {
    if (status === 404) {
      throw new NotFoundError();
    }
  
    if (status === 500) {
      throw new ServerError();
    }
  }
  
  function _throwSpecificError(err) {
    if (err instanceof ServerError || err instanceof NotFoundError) {
      throw err;
    }
    throw new NetworkError();
  }
  
  export class NetworkError extends Error {
    constructor() {
      super("Network error");
    }
  }
  
  export class NotFoundError extends Error {
    constructor() {
      super("The resource you requested was not found.");
    }
  }
  
  export class ServerError extends Error {
    constructor() {
      super("There was a server error.");
    }
  }