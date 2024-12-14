import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const Newss=(props)=>{
    const[article, setArticle] = useState([])
    const[page, setPage] = useState(1)
    const[loding, setLoding] = useState(true)
    const[totalResult, setTotalResult] = useState(0)
    
    
  
     const updateNews= async ()=>{
        props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoding(true );
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticle(parsedData.articles)
      setTotalResult(parsedData.totalResults)
      setLoding(false)
      props.setProgress(100);
    }
    useEffect(()=>{
       updateNews();
        document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
        
    },[])
    
    const fetchMoreData = async()=>{
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
      setLoding(true);
      let data = await fetch(url);
      let parsedData = await data.json();
        setArticle(article.concat(parsedData.articles));  // Ensure it defaults to an empty array
        setTotalResult(parsedData.totalResults);
        setLoding(false)
      };
    
  
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    
  
    
      return (
        <div className="container my-3">
            
          <h1
            className="text-center"
            style={{ margin: "35px 0px",
                marginTop:"90px"
            }}
          >{`NewsMonkey Top ${capitalizeFirstLetter(
            props.category
          )} headlines`}</h1>
          {loding && <Spinner/>}
          <InfiniteScroll
          
            dataLength={article ? article.length : 0} // Safe access
            next={fetchMoreData}
            hasMore={
              article &&
              article.length < totalResult
            } // Safe access
            loader={<Spinner></Spinner>}
          >
            <div className="container">
            <div className="row my-2">
              {article && article.length > 0 ? (
                article.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imgurl={
                        element.urlToImage ||
                        "https://s.yimg.com/ny/api/res/1.2/zI5Z2kTiGZyZq_YNkbIVCg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/pc_mag_263/1502c28015b69d9ad67f0d9efe94c961"
                      }
                      newsUrl={element.url}
                      auther={element.author || "Anonymous"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                ))
              ) : (
                <p>Loading articles...</p>
              )}
            </div>
            </div>
          </InfiniteScroll>
        </div>
      );
    }
  
  Newss.defaultProps = {
    pageSize: 5,
    country: "us",
    category: "general",
  };
  Newss.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  export default Newss