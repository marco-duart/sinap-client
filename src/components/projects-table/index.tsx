import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import type { GetBacklogProjects } from "../../services/projects/DTO";
import * as S from "./styles";
import { format } from "date-fns";

type ProjectBacklog = GetBacklogProjects.Response[number];

interface Props {
  data: ProjectBacklog[];
}

const columns: ColumnDef<ProjectBacklog>[] = [
  {
    accessorKey: "title",
    header: "Projeto",
    cell: (info) => (
      <div style={{ fontWeight: "bold" }}>{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "requestingDepartment",
    header: "Solicitante",
  },
  {
    accessorKey: "priority.name",
    header: "Prioridade",
    cell: (info) => (
      <S.Td priority={info.row.original.priority.value as 4 | 3}>
        {info.getValue() as string}
      </S.Td>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: (info) => format(new Date(info.getValue() as string), "dd/MM/yyyy"),
  },
];

export const ProjectsTable = ({ data }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return (
      <S.TableWrapper>
        <S.NoDataMessage>
          🎉 Não há projetos pendentes no Backlog!
        </S.NoDataMessage>
      </S.TableWrapper>
    );
  }

  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <S.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <S.Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </S.Th>
              ))}
            </S.Tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <S.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <S.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </S.Td>
              ))}
            </S.Tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
};
