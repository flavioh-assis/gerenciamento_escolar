import React from 'react';
import { GridColDef, DataGrid, GridCellParams } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditarIcon from '../../assets/images/icons/edit_icon.png';
import ExcluirIcon from '../../assets/images/icons/trash_icon.png';
import { Class } from '../../types';
import './styles.css';

type Props = {
  classes: Class[];
  handleDelete: (id: number) => void;
  handleEdit: (classValues: Class) => void;
};

export const DadosClasseSelecionada = ({ classes, handleDelete, handleEdit }: Props) => {
  const errorDelete = `Não é possível excluir uma classe com aluno ativo.`;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, hide: true },
    {
      headerName: 'Ano',
      align: 'center',
      field: 'ano',
      headerAlign: 'center',
      width: 110,
    },
    {
      headerName: 'Turma',
      align: 'center',
      field: 'turma',
      headerAlign: 'center',
      width: 130,
    },
    {
      headerName: 'Período',
      align: 'center',
      field: 'periodo',
      headerAlign: 'center',
      width: 140,
    },
    {
      headerName: 'Sala',
      align: 'center',
      field: 'sala',
      headerAlign: 'center',
      width: 120,
    },
    {
      headerName: 'Professor',
      align: 'center',
      field: 'professor',
      headerAlign: 'center',
      width: 220,
    },
    {
      headerName: 'Ativos',
      align: 'center',
      field: 'n_ativos',
      headerAlign: 'center',
      width: 130,
    },
    {
      align: 'center',
      field: 'editar',
      headerAlign: 'center',
      width: 50,
      renderCell: ({ id, row }: any) => {
        const onClick = () => {
          handleEdit({ id, ...row });
        };

        return (
          <Button className="editar" onClick={onClick}>
            <img alt="Editar" className="editar_icon" src={EditarIcon} />
          </Button>
        );
      },
    },
    {
      align: 'center',
      field: 'excluir',
      headerAlign: 'center',
      width: 50,
      renderCell: ({ id, row }: GridCellParams) => {
        const onClick = () => {
          if (row.n_ativos > 0) {
            alert(errorDelete);
            return;
          }
          if (window.confirm('Deseja excluir essa Classe?')) {
            handleDelete(id as number);
          }
        };

        return (
          <Button className="excluir" onClick={onClick}>
            <img alt="Excluir" className="excluir_icon" src={ExcluirIcon} />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="dados-mostra-classes-editar">
      <DataGrid rows={classes} columns={columns} pageSize={9} rowHeight={40} autoHeight />
    </div>
  );
};
