import { Button, Rating, TextField } from "@mui/material";
import React, { useState } from "react";

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]:
        name === "rating" ? (value !== null ? parseFloat(value) : 0) : value,
    }));
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(review.rating, review.comment);
    setReview({
      rating: 0,
      comment: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "50px",
        paddingTop: "50px",
      }}
    >
      <form onSubmit={handleReviewSubmit} style={{ width: "100%" }}>
        <div style={{ display: "flex" }}>
          <Rating
            name="half-rating"
            precision={0.5}
            value={review.rating}
            onChange={(_event, value) =>
              setReview((prevReview) => ({
                ...prevReview,
                rating: value as number,
              }))
            }
            sx={{ marginRight: "10px" }}
          />
          <TextField
            name="comment"
            value={review.comment}
            onChange={handleReviewChange}
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginLeft: "10px" }}
          >
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
