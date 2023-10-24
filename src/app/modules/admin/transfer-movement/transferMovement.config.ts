export const movementTransferConfigTable = [
    { columnDef: 'nameAccountOrigin', header: 'Cuenta Origin', type: 'text' },
    { columnDef: 'nameAccountDestiny', header: 'Cuenta Destino', type: 'text' },
    { columnDef: 'amount', header: 'Cantidad', type: 'number' },
    { columnDef: 'date', header: 'Fecha', type: 'date' },
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
