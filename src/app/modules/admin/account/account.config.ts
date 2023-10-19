export const accountConfigTable = [
    { columnDef: 'name', header: 'Compania', type: 'text' },
    { columnDef: 'salary', header: 'Salario', type: 'number' },
    { columnDef: 'nameCategory', header: 'Categoria', type: 'text' },
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
