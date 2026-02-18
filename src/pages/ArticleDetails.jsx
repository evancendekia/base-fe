import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsArticles } from "../modules/article.slice";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { formatDate } from "../utils/date.utils";

const ArticleDetails = () => {
  const dispatch = useDispatch();
  const { articleDetails, articleDetailsLoading } = useSelector(
    (state) => state.articles,
  );
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchDetailsArticles(window.location.pathname.split("/").pop()));
  }, [dispatch]);

  if (articleDetailsLoading) return <p>Loading...</p>;

  return (
    <main style={{ padding: 20 }}>
      <div className="container my-5">
        <div className="row">
          <div
            key={articleDetails.id}
            className="category-section mb-0 col-md-6  "
          >
            {articleDetails && articleDetails.featuredImage && (
              <div className="article-image mb-4">
                <img
                  src={articleDetails.featuredImage.url}
                  alt={articleDetails.title}
                  className="img-fluid w-100"
                />
              </div>
            )}
          </div>

          <div
            key={articleDetails.id}
            className="category-section mb-0    col-md-4  "
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="category-title">{articleDetails.title}</h2>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="article-date">
                <i className="fa-solid fa-calendar"></i>{" "}
                {formatDate(articleDetails.publishedAt) || "January 1, 2026"} |{" "}
                {articleDetails.categories[0].name}
                <br />
                <i className="fa-solid fa-user"></i>
                {articleDetails.author.username}
              </div>
              <br />
            </div>
          </div>
        </div>

        <div className="row">
          <div
            key={articleDetails.id}
            className="category-section mb-5 col-md-12  "
          >
            <h2 className="category-title">{articleDetails.title}</h2>
            <div className="premium-content-wrapper">
              <div
                className={`premium-content ${
                  (articleDetails.is_premium && user && user.subscription == null) || user == null ? "premium-locked" : ""
                }`}
              >
                <BlocksRenderer content={articleDetails.content} />

                {/* Video Player */}
                {articleDetails?.video?.url && (
                <div className="article-video mb-4">
                    <video
                    className="w-100 rounded"
                    controls
                    preload="metadata"
                    style={{ maxHeight: "500px", backgroundColor: "#000" }}
                    >
                    <source src={articleDetails.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
                )}
              </div>

              {(articleDetails.is_premium && user && user.subscription == null) || user == null ? (
                    <div className="premium-overlay">
                    <div className="premium-overlay-content">
                        <h4>Subscribe to read the full article</h4>
                        <p>Unlock this premium article and enjoy full access.</p>

                        <Link to="/subscribe" className="btn btn-success mt-2">
                        Subscribe Now
                        </Link>
                    </div>
                    </div>
              ):(<></>)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticleDetails;
