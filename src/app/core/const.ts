
export const AUTH_TOKEN = 'authToken'; // Token de genesis payment gateway



export const CREATE_SUCCESS = 'Registro creado exitosamente.';
export const CREATE_ERROR = 'Error al crear el registro.';
export const UPDATE_SUCCESS = 'Actualizado creado exitosamente.';
export const UPDATE_ERROR = 'Error al actualizar el registro.';

export const DELETE_SUCCESS = 'Eleminacion exitosamente';
export const DELETE_ERROR = 'Error al Eleminacion el registro.';

export enum TypeMovement {
    Income = 0,
    Exit = 1,
  }


  export const TYPE_MODE_LIST = [
    { value: 0, label: 'Ingreso', color: 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-50' },
    { value: 1, label: 'Gastos', color: 'bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-50' },
    { value: 2, label: 'Ingreso Transferencia', color: 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-50' },
    { value: 3, label: 'Salida Transferencia', color: 'bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-50' },

  ];