import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../utils/request";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const HomeDetail = () => {
  const { id } = useParams();
  const [productDialog, setProductDialog] = useState(false);
  const [idNumber, setIdNumber] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
    (async () => {
      const data = await request(`/api/home/${id}`);
      console.log(data);
      setData(data);
      // setProducts(data)
      // console.log(newData);
    })();
  }, []);

  if (data == null) {
    return <div>Loading</div>;
  }

  const submit = async () => {
    const data = await request(
      `/api/home/addMember`,
      "POST",
      JSON.stringify({
        id,
        citizenIdNumber: idNumber,
      })
    );
    setData({ ...data, members: [...data.members, data] });
  };

  const footer = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={() => setProductDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={() => {
          submit();
          setProductDialog(true);
        }}
      />
    </React.Fragment>
  );

  return (
    <div>
      <div>address: {data.home.address}</div>
      <div>homeId: {data.home.id}</div>
      <Button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={() => setProductDialog(true)}
      />
      <DataTable value={data.members} tableStyle={{ minWidth: "50rem" }}>
        <Column field="idNumber" header="Code"></Column>
        <Column field="fullName" header="Name"></Column>
        <Column field="email" header="Category"></Column>
        <Column field="dob" header="DOB"></Column>
        <Column field="phone" header="Phone"></Column>
      </DataTable>
      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={footer}
        onHide={() => {
          setData(null);
          setProductDialog(false);
        }}
      >
        <div className="confirmation-content">
          <label htmlFor="idNumber" className="font-bold">
            CCCD của user
          </label>
          <InputText
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            autoFocus
            className={classNames({
              "p-invalid": !idNumber,
            })}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default HomeDetail;
