export const movementConfigTable = [
    { columnDef: 'descripcion', header: 'Descripcion', type: 'text' },
    { columnDef: 'amount', header: 'Cantidad', type: 'number' },
    { columnDef: 'typeMovement', header: 'Tipo de movimiento', type: 'typeMovement' },
    { columnDef: 'date', header: 'Fecha', type: 'text' },
    {
        columnDef: 'actions',
        header: 'Acciones',
        type: 'actions',
        actionsList: [
            {
                type: 'edit',
                tooltipText: 'Editar',
                icon: 'heroicons_solid:pencil',
                classColor: 'text-blue-400',
            }, 
            {
                type: 'delete',
                tooltipText: 'Eliminar',
                icon: 'heroicons_solid:trash',
                classColor: 'text-red-400',
            },
        ],
    },
];
