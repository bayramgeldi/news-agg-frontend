import * as PropTypes from "prop-types";
import {relative} from "../Utils/format";

function Image(props) {
    return (
        <div style={{height: 325, width: 390, overflow: 'hidden', borderRadius: 8}}>
            <img src={props.item.urlToImage} className="image rounded" alt={props.item.title}/>
        </div>)

}

Image.propTypes = {item: PropTypes.any};
export const NewsCard = ({news}) => {
    return (
        <div className="col-md-4 col-xs-12 card">
            <Image item={news}/>
            <div className="news-card-header border-0">
                <div className={"source"}>{news?.subSource.name} &bull;<small className="align-middle p-1 text-muted">{relative(news?.publishedAt)}</small></div>
            </div>
                <div className="card-body">
                    <h3 className="card-title"><a href={news.url} target={"_blank"} className={"text-decoration-none"} style={{color:"var(--bs-card-title-color)"}}>{news.title}</a></h3>
                    <p className="card-text">{news.description}</p>
                    <p className="card-text">
                            <small className={"red"}>{news.category.title}</small> &bull;
                            <small className="text-muted m-1">{relative(news.publishedAt)}</small>
                    </p>
                </div>
        </div>
    )
}
