import { Box, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getImageURL } from "../../controllers/user";



const rows = [
  { id: 1, title: 'Snow', description: 'Jon', price: 35 }
]

export function Catalog({ rows, onEdit }) {

  const columns = [
    { field: 'title', headerName: 'TITLE', width: 190 },
    { field: 'description', headerName: 'DESCRIPTION', width: 220 },
    { field: 'price', headerName: 'PRICE', width: 70 },
    // image thumb
    {
      field: 'image', headerName: 'IMAGE', width: 90, renderCell: (params) => {
        return (
          <div>
            <img src={getImageURL(params.row.filename)} style={{ width: 50, height: 50 }} />
          </div>
        )
      }
    },
    {
      field: 'actions', headerName: 'Actions', width: 90, renderCell: (params) => {
        return (
          <div>
            <Button onClick={(e) => handleEdit(e, params.row)} variant="contained">Edit</Button>
          </div>
        )
      }
    },
  ]


  function handleEdit(e, row) {
    console.log(row);
    // switch to edit page with row._id
    onEdit(row._id);

  }

  return (
    <Box sx={{ display: 'flex', padding: 3 }}>
      <Grid container spacing={2} columns={12}>
        <DataGrid

          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          density="compact"
          slotProps={{
            filterPanel: {
              filterFormProps: {
                logicOperatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                },
                columnInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                operatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                valueInputProps: {
                  InputComponentProps: {
                    variant: 'outlined',
                    size: 'small',
                  },
                },
              },
            },
          }}
        />
        {/* <Grid size={{ xs: 12, lg: 3 }}>
                <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
                    <CustomizedTreeView />
                    <ChartUserByCountry />
                </Stack>
            </Grid> */}
      </Grid>
    </Box>

  )
}