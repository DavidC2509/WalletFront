export const categoryMovementConfigTable = [
    { columnDef: 'name', header: 'Categoria', type: 'text' },
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
            }
        ],
    },
];
