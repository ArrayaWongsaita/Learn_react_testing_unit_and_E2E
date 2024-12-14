import {range} from '../utils/utils';

export default function Pagination({ total, limit, currentPage, selectPage }) {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount + 1);
  return (
    <ui>
      {pages.map((page) => (
        <li
          key={page}
          data-testid="page-container"
          onClick={() => selectPage(page)}
          className={`page-item ${page === currentPage ? "active" : ""}`}
        >
          <span className="page-link">{page}</span>
        </li>
      ))}
    </ui>
  );
}
