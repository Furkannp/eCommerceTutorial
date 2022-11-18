/* eslint-disable react/prop-types */
import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, Select, MenuItem, Box, FormControl } from "@mui/material";
import { Button, ButtonToolbar } from "reactstrap";
import { withTranslation } from 'react-i18next';

const CustomTable = (props) => {
  const {
    data,
    columns,
    title,
    isLoading,
    onClick,
    customButtonBool,
    customButtonOnClick,
    customButtonText,
    isPaging,
    cartActionsButtonsBool,
    removeFromCart,
    addToCart,
    limitButtonBool,
    selectedLimit,
    onLimitChange,
    t
  } = props;
  const defaultMaterialTheme = createTheme();

  const tableColumns = columns.map((column) => {
    switch (column.field) {
      case "actions":
        return {
          title: column.title,
          field: "actions",
          render: (rowData) => {
            if (cartActionsButtonsBool) {
              return (
                <div className="">
                  <div
                    className="d-flex mt-4"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="d-flex">
                      <div>
                        <Button
                          color="danger"
                          disabled={rowData.quantity < 1}
                          onClick={() => {
                            removeFromCart(rowData);
                          }}
                        >
                          -
                        </Button>
                      </div>
                      <div
                        className="text-center"
                        style={{ width: "38px", fontSize: "28px" }}
                      >
                        {rowData.quantity}
                      </div>
                      <div>
                        <Button
                          color="success"
                          onClick={() => {
                            addToCart(rowData);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              );
            }
          },
        };
      case "image":
        return {
          title: column.title,
          field: "image",
          render: (rowData) => {
            if (rowData.image) {
              return (
                <div className="">
                  <img
                    src={rowData.image}
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  ></img>
                </div>
              );
            }
          },
        };
      case "id":
        return {
          title: column.title,
          field: "id",
          cellStyle: {
            whiteSpace: "nowrap",
          },
          headerStyle: {
            whiteSpace: "nowrap",
          },
          render: (rowData) => {
            if (rowData.id) {
              return <div style={{ width: "16px" }}>{rowData.id}</div>;
            }
          },
        };
      case "totalAmount":
        return {
          title: column.title,
          field: "totalAmount",
          render: (rowData) => {
            if (rowData.id) {
              return (
                <div style={{ width: "16px" }}>
                  {rowData.price * rowData.quantity}$
                </div>
              );
            }
          },
        };
      case "price":
        return {
          title: column.title,
          field: "price",
          render: (rowData) => {
            if (rowData.id) {
              return <div style={{ width: "16px" }}>{rowData.price}$</div>;
            }
          },
        };
      default:
        return column;
    }
  });
  return (
    <div>
      <div style={{ width: "100%", height: "100%" }}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            columns={tableColumns}
            disableOnClick
            data={data}
            title={title || ""}
            isLoading={isLoading}
            localization={{
              pagination: {
                labelRowsSelect: t('table.labelRowsSelect'),
                nextTooltip: t('table.nextTooltip'),
                previousTooltip: t('table.previousTooltip'),
                firstTooltip: t('table.firstTooltip'),
                lastTooltip: t('table.lastTooltip'),
                labelDisplayedRows: t('table.labelDisplayedRows'),
                labelRowsPerPage: t('table.labelRowsPerPage')
              },
              body: {
                emptyDataSourceMessage: t('table.emptyDataSourceMessage'),
              },
            }}
            options={{
              paging: isPaging,
              headerStyle: {
                backgroundColor: "#DEF3FA",
                color: "Black",
                whiteSpace: "nowrap",
              },
            }}
            onRowClick={
              onClick
                ? (event, rowData) => {
                    onClick(rowData);
                  }
                : null
            }
            components={{
              Toolbar: () => (
                <div style={{ padding: "10px 0", display: "flow-root" }}>
                {customButtonBool && (
                  <ButtonToolbar
                    style={{ padding: "0px 10px", float: "right" }}
                  >
                    <>
                      <Button
                        onClick={customButtonOnClick}
                        style={{ margin: "0.25rem" }}
                        size="sm"
                        color="light"
                      >
                        {customButtonText}
                      </Button>
                    </>
                  </ButtonToolbar>
                )}
                {limitButtonBool && (
                     <Box sx={{ width: 240, marginLeft: "1rem" }}>
                      <FormControl variant="standard" sx={{ m: 0, p:0, minWidth: 120 }}>
                       <Select
                         style={{ padding: '2px 2px' }}
                         id="limitSelect"
                         value={selectedLimit}
                         onChange={(event)=>onLimitChange(event.target.value)}
                       >
                         <MenuItem value={5}>{t('table.get5Product')}</MenuItem>
                         <MenuItem value={10}>{t('table.get10Product')}</MenuItem>
                         <MenuItem value={15}>{t('table.get15Product')}</MenuItem>
                         <MenuItem value="all">{t('table.getAllProduct')}</MenuItem>
                       </Select>
                       </FormControl>
                   </Box>
                )}
                </div>
              ),
            }}
            
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default (withTranslation('common')(CustomTable));
