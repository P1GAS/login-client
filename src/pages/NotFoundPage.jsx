import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="container not-found">
    <h1 className="not-found-code">404</h1>
    <p>
      Страница не найдена <Link to="/people">на главную</Link>
    </p>
  </div>
);

export default NotFoundPage;
