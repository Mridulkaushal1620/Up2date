import React from "react";

const NewsItem=(props)=>{
  
    let { title, description, imgurl, newsUrl, auther, date, source} = props;
    return (
      <div>
        <div className="card my-3" >
          <img src={imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex: '1'}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target="_blank"className="btn btn-sm btn-dark" rel="noreferrer">
              Read more
            </a>
          </div>
          <div class="card-footer">
        <small class="text-body-secondary">by {auther} on {new Date(date).toGMTString()}</small>
      </div>
        </div>
      </div>
    );
  }
export default NewsItem