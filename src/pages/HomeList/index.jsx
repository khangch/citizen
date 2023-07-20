import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { request } from "../../utils/request";
import { Link } from "react-router-dom";

const HomeList = () => {
  let emptyProduct = {
    address: "",
    idNumber: "",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editProductDialog, setEditProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
    (async () => {
      const data = await request("/api/home/getAll");

      setProducts(data);
      // console.log(newData);
    })();
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideEditDialog = () => {
    setSubmitted(false);
    setEditProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    console.log(product);
    const submitData = await request(
      "/api/home/add",
      "POST",
      JSON.stringify({
        address: product.address,
        citizenIdNumber: Number(product.idNumber),
      })
    );
    console.log(submitData);
    setSubmitted(true);

    let _products = [...products];
    let _product = { ...product, owner: submitData.owner };

    if (product.id) {
      const index = findIndexById(product.id);

      _products[index] = _product;
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Citizen Updated",
        life: 3000,
      });
    } else {
      _product.id = createId();
      _products.push(_product);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Citizen Created",
        life: 3000,
      });
    }

    setProducts(_products);
    setProductDialog(false);
    setProduct(emptyProduct);
  };

  const editProduct = async (product) => {
    setProduct(product);

    setEditProductDialog(true);
  };

  const confirmEditProduct = async () => {
    console.log(product);
    const submitData = await request(
      `/api/home/${product.id}/update`,
      "POST",
      JSON.stringify({
        address: product.address,
        idNumber: Number(product.idNumber),
      })
    );
    if (submitData.id) {
      const index = findIndexById(submitData.id);
      let _products = [...products];
      _products[index] = submitData;
      setProducts(_products);
      setEditProductDialog(false);
    }
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    const submitData = await request(`/api/home/${product.id}`, "DELETE");
    setDeleteProductDialog(false);
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Citizen Deleted",
      life: 3000,
    });
  };

  const findByFullname = async (name) => {
    const submitData = await request(`/api/home/find/${name}`, "GET");
    // const result = submitData.map(item => {
    //     return item
    // })
    setProducts(submitData);
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    console.log(e.target.value);
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;
    console.log(_product);
    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex">
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </div>
    );
  };

  // const imageBodyTemplate = (rowData) => {
  //     return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
  // };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const homeName = (rowData) => {
    return <Link to={`/home/${rowData.id}`}>{rowData.address}</Link>;
  };

  const ownerName = (rowData) => {
    return <div>{rowData.owner && rowData.owner.fullName}</div>;
  };

  // const memberCount = (rowData) => {
  //     return (
  //         <div>{rowData.homeMembers.length}</div>
  //     )
  // }

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Danh sách địa chỉ</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => findByFullname(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );

  const editDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        onClick={hideEditDialog}
      />
      <Button label="Save" icon="pi pi-check" onClick={confirmEditProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column selectionMode="multiple" exportable={false}></Column> */}
          <Column
            field="address"
            body={homeName}
            header="địa chỉ nhà"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field=""
            body={ownerName}
            header="Chủ nhà"
            style={{ minWidth: "16rem" }}
          ></Column>
          {/* <Column field="member" body={memberCount} header="Thành viên" style={{ minWidth: '12rem' }}></Column> */}
          <Column
            field="electricPrice"
            header="Giá điện"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            header="Thao tác"
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add home"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="idNumber" className="font-bold">
            CCCD chủ nhà
          </label>
          <InputText
            id="idNumber"
            value={product.idNumber}
            onChange={(e) => onInputChange(e, "idNumber")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.idNumber,
            })}
          />
          {submitted && !product.name && (
            <small className="p-error">idNumber is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="address" className="font-bold">
            Địa chỉ nhà
          </label>
          <InputText
            id="address"
            value={product.address}
            onChange={(e) => onInputChange(e, "address")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.address,
            })}
          />
          {submitted && !product.address && (
            <small className="p-error">Address is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={editProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add home"
        modal
        className="p-fluid"
        footer={editDialogFooter}
        onHide={hideEditDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            CCCD chủ nhà
          </label>
          <InputText
            id="idNumber"
            value={product.idNumber}
            onChange={(e) => onInputChange(e, "idNumber")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.idNumber,
            })}
          />
          {submitted && !product.idNumber && (
            <small className="p-error">idNumber is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="address" className="font-bold">
            địa chỉ nhà
          </label>
          <InputText
            id="address"
            value={product.address}
            onChange={(e) => onInputChange(e, "address")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.address,
            })}
          />
          {submitted && !product.address && (
            <small className="p-error">Address is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default HomeList;
