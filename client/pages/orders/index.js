const OrderIndex = (orders) => {
  return (
    <div>
      <h1>Orders</h1>
      <div>
        {orders.orders.map((order) => {
          return (
            <div key={order.id}>
              {order.ticket.title} - {order.ticket.price}
            </div>
          );
        })}
      </div>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
