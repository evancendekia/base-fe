import { useSelector } from "react-redux";
import { formatDate } from "../utils/date.utils";
// const pastelColors = [
//     "pastel-green",
//     "pastel-blue",
//     "pastel-pink",
// ];

const ArticleCard = ({ article, index  }) => {
  const user = useSelector((state) => state.auth.user);

  const isLocked =
    article.isPremium &&
    user?.plan !== "premium";

    
  // const colorClass = pastelColors[index % 3];

  return (
    <>
      <img
          src={article.image}
          alt={article.title}
          className="img-fluid w-100 rounded-3"
      />
      <h4 className="article-heading">
        {article.title} {article.is_premium && <i className="fa-solid fa-crown text-warning fa-2xs"></i>}
      </h4>
      <div className="article-date">
        <i className="fa-solid fa-calendar"></i> {formatDate(article.publishedAt) || "January 1, 2026"}
      </div>
    </>
  );
};
export default ArticleCard;
