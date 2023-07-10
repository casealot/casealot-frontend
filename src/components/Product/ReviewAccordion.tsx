import React, { ChangeEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  OutlinedInput,
  Button,
  Rating,
} from "@mui/material";

import { Review } from "../../atom/Product";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
interface ReviewAccordionProps {
  review: Review;
  onCommentSubmit: (reviewId: number) => void;
  onCommentChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ReviewAccordion: React.FC<ReviewAccordionProps> = ({
  review,
  onCommentSubmit,
  onCommentChange,
}) => {
  const {
    customerName,
    rating,
    reviewText,
    createdDt,
    reviewCommentList,
    available,
  } = review;

  const handleCommentSubmit = () => {
    onCommentSubmit(review.id);
  };

  return (
    <Accordion>
      <div style={{ paddingLeft: "10px" }}>
        <AccordionSummary>
          <Typography variant="h5">{customerName}</Typography>
          <Rating name="read-only" value={rating} readOnly />
          <Typography
            sx={{
              marginLeft: "10px",
              fontWeight: "500",
              marginTop: "2px",
            }}
          >
            {reviewText}
          </Typography>
          {available === "Y" ? (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button sx={{ padding: "0", minWidth: "0px" }}>
                  <EditIcon />
                </Button>
                <Button sx={{ padding: "0", minWidth: "0px" }}>
                  <CancelIcon />
                </Button>
              </div>
            </>
          ) : (
            ""
          )}
          <Typography sx={{ fontSize: "12px", marginLeft: "auto" }}>
            작성시간 : {createdDt}
          </Typography>
        </AccordionSummary>
      </div>
      <AccordionDetails>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {reviewCommentList &&
              reviewCommentList.map((reviewComment, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    marginBottom: "5px",
                    paddingLeft: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      marginRight: "3px",
                      fontWeight: "600",
                    }}
                  >
                    {reviewComment.customerName}님
                  </Typography>
                  <Typography> - {reviewComment.reviewCommentText}</Typography>

                  <Typography sx={{ marginLeft: "auto", fontSize: "12px" }}>
                    {" "}
                    {reviewComment.modifiedDt}
                  </Typography>
                </div>
              ))}
          </div>
          <div>
            <FormControl
              sx={{
                width: "90%",
                marginY: "10px",
              }}
            >
              <OutlinedInput
                onChange={onCommentChange}
                placeholder="댓글을 입력하세요"
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{
                marginLeft: "10px",
                marginTop: "20px",
                height: "fit-content",
              }}
              onClick={handleCommentSubmit}
            >
              등록
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReviewAccordion;
