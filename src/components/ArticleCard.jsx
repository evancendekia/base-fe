import { useSelector } from "react-redux";
const pastelColors = [
    "pastel-green",
    "pastel-blue",
    "pastel-pink",
];

const ArticleCard = ({ article, index  }) => {
  const user = useSelector((state) => state.auth.user);

  const isLocked =
    article.isPremium &&
    user?.plan !== "premium";

    
  const colorClass = pastelColors[index % 3];

  return (
    <div className={`article-box ${colorClass}`}>
      <h5 className="article-heading">
        {article.title}
      </h5>

      <div className="article-date">
        {article.date || "January 1, 2026"}
      </div>
    </div>
  );
};
export default ArticleCard;
