import React, { useState, useEffect } from "react";
import { Table, PageHeader, Tag } from "antd";
import Axios from "axios";
const { Column } = Table;

function ProductList() {
  const [History, setHistory] = useState([]);

  const newDoc = [];
  let i = 0;
  useEffect(() => {
    Axios.get("/api/users/history").then(response => {
      if (response.data.success) {
        response.data.doc.forEach(() => {
          newDoc.push(response.data.doc[i]);
          i++;
        });
        const flatlist = newDoc.flat();
        setHistory(flatlist);
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <PageHeader
      title="ProductPurchase List"
      className="site-page-header"
      tags={<Tag color="blue">내역</Tag>}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    >
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <br />
          <Table key dataSource={History}>
            <Column
              title="결제ID"
              dataIndex="data"
              key="data"
              render={data => (
                <>
                  {data.map((data, index) => (
                    <div key={index}>{data.uid}</div>
                  ))}
                </>
              )}
            />
            <Column
              title="상품명"
              dataIndex="product"
              key="product"
              render={product => (
                <>
                  {product.map((data, index) => (
                    <div key={index}>{data.name}</div>
                  ))}
                </>
              )}
            />
            <Column
              title="가격"
              dataIndex="product"
              key="product"
              render={product => (
                <>
                  {product.map((data, index) => (
                    <div key={index}>{data.price}원</div>
                  ))}
                </>
              )}
            />
            <Column
              title="수량"
              dataIndex="product"
              key="product"
              render={product => (
                <>
                  {product.map((data, index) => (
                    <div key={index}>{data.quantity}EA</div>
                  ))}
                </>
              )}
            />

            <Column
              title="구매자"
              dataIndex="user"
              key="user"
              render={product => (
                <>
                  {product.map((data, index) => (
                    <div key={index}>{data.name}</div>
                  ))}
                </>
              )}
            />

            <Column
              title="구매자(Email)"
              dataIndex="user"
              key="user"
              render={product => (
                <>
                  {product.map((data,index) => (
                    <div key={index}>{data.email}</div>
                  ))}
                </>
              )}
            />
          </Table>
        </div>
      </div>
    </PageHeader>
  );
}

export default ProductList;
