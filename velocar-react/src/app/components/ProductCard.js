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
      <CardImg top width="100%" src={product.image} alt={product.name} />
      <CardBody>
        <CardTitle tag="h5">{product.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          ${product.price}
        </CardSubtitle>
        <CardText>{product.description}</CardText>
        <Button>View Details</Button>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
