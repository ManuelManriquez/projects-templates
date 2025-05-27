import type { ProfileList } from "../interfaces/api.interfaces";

export const getExternalData = async () => {
  try {
    const response = await fetch("https://fake-json-api.mock.beeceptor.com/users");

    if (!response.ok) {
      return {
        error: true,
        message: "Error al consumir la API externa",
        status: response.status
      };
    }

    const data: ProfileList = await response.json();

    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      error: true,
      message: "Error interno al hacer la petición",
      details: String(error)
    };
  }
};
