import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/post_carousel.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import profileIcon from "../assets/profile_image_icon.png";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow left-arrow" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow right-arrow" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const UserPostsCarousel = ({ posts }) => {
  const [expandedPostId, setExpandedPostId] = useState(null); // For managing expanded text

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Helper function to calculate words and slice text
  const getTextPreview = (text, wordLimit = 20) => {
    const words = text.split(" ");
    return words.length > wordLimit ? `${words.slice(0, wordLimit).join(" ")}...` : text;
  };

  return (
    <div className="user-posts-carousel">
      <Slider {...settings}>
        {posts.map((post) => {
          const { _id, title, text, image, ownerDetails } = post;
          const fullName = ownerDetails?.fullName || " "; // Default to 'Anonymous User' if missing

          const isExpanded = expandedPostId === _id;
          const wordLimit = 20; // Default word limit

          return (
            <div key={_id} className="carousel-slide">
              <div className="post-container">
                <div className="post-header">
                  {/* Profile Image */}
                  <div className="profile-pic-container">
                    <img
                      src={post.profilePic || profileIcon} // Use placeholder if missing
                      alt="User"
                      className="profile-pic"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="post-info">
                    {/* User Name */}
                    <p className="user-name">{fullName}</p>

                    {/* Post Time */}
                    <p className="post-time">
                      {new Date(post.createdAt).toLocaleString()} ago
                    </p>
                  </div>
                </div>

                {/* Title */}
                {title && <h3 className="post-title">{title}</h3>}

                {/* Text */}
                <p className="post-text">
                  {text ? (isExpanded ? text : getTextPreview(text)) : "No content available"}
                </p>

                {/* Read More/Read Less Button */}
                {text && text.split(" ").length > wordLimit && (
                  <button
                    className="read-more-btn"
                    onClick={() => setExpandedPostId(isExpanded ? null : _id)}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}

                {/* Image */}
                {image && image !== "" && (
                  <div className="post-image-container">
                    <img src={image} alt="Post" className="post-image" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default UserPostsCarousel;
