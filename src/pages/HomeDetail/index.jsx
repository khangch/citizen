import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../../utils/request';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const HomeDetail = () => {
    const { id } = useParams()
    console.log(id);
    const [data, setData] = useState();

    useEffect(() => {
        // ProductService.getProducts().then((data) => setProducts(data));
        (async () => {
            const data = await request(`/api/home/${id}`);
            console.log(data);
            setData(data);
            // setProducts(data)
            // console.log(newData);
        })()
    }, []);

    if (data == null) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div>
            <div>address: {data.home.address}</div>
            <div>homeId: {data.home.id}</div>
            <DataTable value={data.members} tableStyle={{ minWidth: '50rem' }}>
                <Column field="idNumber" header="Code"></Column>
                <Column field="fullName" header="Name"></Column>
                <Column field="email" header="Category"></Column>
                <Column field="dob" header="DOB"></Column>
                <Column field="phone" header="Phone"></Column>
            </DataTable>
        </div>
    )
}

export default HomeDetail