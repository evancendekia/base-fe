import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupedArticles } from "../modules/article.slice";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  const dispatch = useDispatch();
  const { grouped, loading } = useSelector(
    (state) => state.articles
  );
  useEffect(() => {
    dispatch(fetchGroupedArticles());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (  
    <main style={{ padding: 20 }}>  
        <div className="container my-5">
            <div className="row">

                {grouped.map((category) => (
                    <div key={category.id} className="category-section mb-5 col-md-6">

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

                    {/* Title + View All */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="category-title">
                        {category.name}
                        </h2>
                        <a href="#" className="view-all">
                        View All
                        </a>
                    </div>

                    {/* Articles Grid */}
                    <div className="row g-4">
                        {category.articles.map((article, index) => (
                        <div key={article.id} className="col-md-6">
                            <ArticleCard
                            article={article}
                            index={index}
                            />
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

export default Home;
