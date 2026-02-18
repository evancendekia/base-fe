import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchGroupedArticles } from "../modules/article.slice";
import { fetchTopicsDetails } from "../modules/topic.slice";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const dispatch = useDispatch();
  const { topicDetails, topicDetailsLoading } = useSelector(
    (state) => state.topics
  );
  useEffect(() => {
    dispatch(fetchTopicsDetails(window.location.pathname.split("/").pop()));
  }, [dispatch]);

  if (topicDetailsLoading) return <p>Loading...</p>;

  return (  
    <main style={{ padding: 20 }}>  
        <div className="container my-5">
            <div className="row">

                {topicDetails.map((category) => (
                    <div key={category.id} className="category-section mb-5 col-md-12">

                    {/* Banner */}
                    {category.banner && (
                        <div className="category-banner mb-4">
                        <img
                            src={category.banner}
                            alt={category.name}
                            className="img-fluid w-100"
                        />
                        </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="category-title">
                        {category.name}
                        </h2>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <p >
                        {category.description}
                        </p>
                    </div>

                    {/* Articles Grid */}
                    <div className="row g-4">
                        {category.articles.map((article, index) => (
                        <div key={article.id} className="col-md-3">
                            <Link
                                to={`/article/${article.slug}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <ArticleCard
                                    article={article}
                                    index={index}
                                />
                            </Link>
                        </div>
                        ))}
                    </div>

                    </div>
                ))}
            </div>

        </div>

    </main>
  );
};

export default ArticleList;
