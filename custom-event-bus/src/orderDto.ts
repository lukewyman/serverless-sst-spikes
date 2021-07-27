interface OrderDto {
  body: {
    orderId: string;
    product: string;
    count: number;
  };
}

export default OrderDto;