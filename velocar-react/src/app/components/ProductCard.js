import React from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

function ProductCard({ product }) {
  return (
    <Card>
      <CardImg top width="100%" src={product.imageUrl} alt={product.title} />
      <CardBody>
        <CardTitle>{product.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">{product.price}</CardSubtitle>
        <CardText>{product.gear}</CardText>
        <Button href={"../pages/" + product.id}>View Details</Button>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
