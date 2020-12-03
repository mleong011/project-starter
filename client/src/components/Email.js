import React from 'react';
import { Link } from 'react-router-dom';

function Email({ name, email }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={"/dashboard/"}>{ name }</Link>
        </div>
        <div className="card-footer small text-muted text-right">
          { email }
        </div>
      </div>
    </div>
  );
}

export default Email;