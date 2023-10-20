
export const AUTH_TOKEN = 'authToken'; // Token de genesis payment gateway



export const CREATE_SUCCESS = 'Registro creado exitosamente.';
export const CREATE_ERROR = 'Error al crear el registro.';


export enum TypeMovement {
    Income = 0,
    Exit = 1,
  }


  export const TYPE_MODE_LIST = [
    { value: 0, label: 'Ingreso', color: 'bg-orange-200 text-orange-800 dark:bg-orange-600 dark:text-orange-50' },
    { value: 1, label: 'Gastos', color: 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-50' },
  ];